"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commands_1 = require("src/Commands");
exports.default = (client) => {
    client.on("interactionCreate", async (interaction) => {
        if (interaction.isApplicationCommand() || interaction.isContextMenu()) {
            await onSlashCommand(client, interaction);
        }
    });
};
const onSlashCommand = async (client, interaction) => {
    const slashCommand = Commands_1.Commands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }
    await interaction.deferReply();
    slashCommand.run(client, interaction);
};
