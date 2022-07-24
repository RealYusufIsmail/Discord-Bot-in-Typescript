import Discord, {ButtonInteraction, Client, CommandInteraction, GuildMember, Interaction, User} from "discord.js";
import {RegSlashCommands, RegSlashMusicCommands} from "../handle/command/RegSlashCommands";
import {RegButtons} from "../handle/button/RegButtons";
import {Player} from "discord-music-player";


export default (client: Client, player: Player): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isChatInputCommand()) {
            await handleSlashCommand(client, interaction, player);
        } else if (interaction.isButton()) {
            await handleButton(client, interaction);
        }
    });
}

const handleSlashCommand = async (client: Client, interaction: CommandInteraction, player: Player): Promise<void> => {
    const command = RegSlashCommands.find(c => c.name === interaction.commandName) ?? RegSlashMusicCommands.find(c => c.name === interaction.commandName);

    if (!command) {
        await interaction.reply({content: "Could not find the command", ephemeral: true});
        return;
    }

    const guildMember = interaction.member as GuildMember;
    const bot = client.isReady() ? client.user as User : null;

    const botAsMember = guildMember.guild.members.cache.get(bot!.id) as GuildMember;

    if (botAsMember == null && command.botRequiredPerms != null || command.botRequiredPerms != null) {
        await interaction.reply({content: "This command can only be used in a guild", ephemeral: true});
        return;
    }

    await checkIfMemberPerms(guildMember, command.userRequiredPerms, interaction);
    await checkIfMemberPerms(botAsMember, command.botRequiredPerms, interaction);

    await command.run(client, interaction, player);
}

async function checkIfMemberPerms(member: GuildMember, perms: bigint[] | undefined, interaction: CommandInteraction): Promise<boolean> {
    if (member != null) {
        if (perms != null) {
            const missingPerms = perms.filter(p => !member.permissions.has(p));
            if (missingPerms.length > 0) {
                await interaction.reply({
                    content: `You do not have the required permissions: ${missingPerms.join(", ")}`,
                    ephemeral: true
                });
                return false;
            }
        }
        return true;
    } else {
        return true;
    }
}

const handleButton = async (client: Discord.Client, interaction: ButtonInteraction): Promise<void> => {
    const button = RegButtons.find(b => b.customId === interaction.customId);

    if (!button) {
        await interaction.reply({content: "Could not find the button", ephemeral: true});
        return;
    }

    await button.run(client, interaction);
}