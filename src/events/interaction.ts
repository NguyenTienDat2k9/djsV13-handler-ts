import type { Interaction } from 'discord.js';
import Discord from 'discord.js';
import { Events } from '../interfaces';

export const event: Events = {
    name: 'interactionCreate',
    run: async (client, interaction: Interaction) => {
        if (interaction.isCommand()) {
            const cmd = client.slashCommands.get(interaction.commandName);
            if (!cmd) return;
            cmd.run(client, interaction);
        };
    },
};
