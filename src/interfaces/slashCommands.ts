import Client from '../client';
import Discord from 'discord.js';

interface Run {
    (client: Client, interaction: Discord.CommandInteraction): any;
}

export type SlashCommands = Discord.ApplicationCommandData & {
    name: string;
    run: Run;
}