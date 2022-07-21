"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ban = void 0;
const discord_js_1 = require("discord.js");
exports.Ban = {
    name: "ban",
    description: "Bans a user from the server",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "user",
            description: "The user to ban",
            type: discord_js_1.ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "reason",
            description: "The reason for the ban",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async (client, interaction) => {
        const user = interaction.options.getUser("user");
        const reason = interaction.isChatInputCommand() ? interaction.options.getString("reason") : "No reason provided";
        if (!user) {
            await interaction.reply("Could not find the user to ban");
            return;
        }
        if (!reason) {
            await interaction.reply("No reason provided");
            return;
        }
        await interaction.guild.members.ban(user, { reason })
            .then(() => {
            interaction.reply(`Banned ${user.username}#${user.discriminator}`);
        }).catch(() => {
            interaction.reply({ content: "Could not ban the provided user", ephemeral: true });
        });
    }
};
