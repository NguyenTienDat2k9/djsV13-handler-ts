import type { SlashCommands } from '../../interfaces';

export const slash: SlashCommands = {
    name: "ping",
    description: "Displays the bot latency.",
    run: async (client, interaction) => {
        interaction.reply(`Pong! ${client.ws.ping} ms`);
    },
};