import Discord, { MessageFlags } from "discord.js";
import { Events } from "../interfaces";
import Client from "../client";

export const event: Events = {
    name: "messageCreate",
    run: async (client: Client, message: Discord.Message) => {
        const prefix = `${process.env.PREFIX}`;
        if (!message.content.startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift()?.toLowerCase();
        if (!cmd || cmd.length === 0) return;
        const command = client.prefixCommands.get(cmd) || client.prefixCommands.get(client.aliases.get(cmd) || '');
        if (command) command.run(client, message, args);
    }
}
