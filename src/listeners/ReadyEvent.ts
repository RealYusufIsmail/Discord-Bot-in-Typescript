import { Client } from "discord.js";
import { Commands } from "src/Commands";

export default (client: Client) : void => {
    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }

        //register the bot's slash commands
        await client.application.commands.set(Commands);

        console.log(`Logged in as ${client.user.tag}!`);
        
    });
}