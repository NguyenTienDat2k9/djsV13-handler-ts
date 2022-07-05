import type { PrefixCommands } from '../../interfaces';

export const command: PrefixCommands = {
    name: "ping",
    description: "Displays the bot latency.",
    aliases: ['p'],
    run: async (client, message, args) => {
        message.channel.send(`Pong! ${client.ws.ping} ms`);
    },
};