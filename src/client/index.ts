import Discord from "discord.js";
import 'dotenv/config';
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import { PrefixCommands, Events, SlashCommands } from "../interfaces";

class bot extends Discord.Client {
    public prefixCommands: Discord.Collection<string, PrefixCommands> = new Discord.Collection();
    public slashCommands: Discord.Collection<string, SlashCommands> = new Discord.Collection();
    public events: Discord.Collection<string, Events> = new Discord.Collection();
    public aliases: Discord.Collection<string, string> = new Discord.Collection();
    public constructor() {
        super({
            intents: 32767,
            partials: ['CHANNEL'],
            allowedMentions: { repliedUser: true },
        });
    }
    public async init() {
        this.login(process.env.TOKEN);

        // Event Handler
        const eventPath = path.join(__dirname, '..', 'events');
        fs.readdirSync(eventPath).forEach(async file => {
            const { event } = await import(`${eventPath}/${file}`);
            this.events.set(event.name, event);
            this.on(event.name, event.run.bind(null, this));
        });

        // Command Handler
        const commandPath = path.join(__dirname, '..', 'prefixCommands');
        fs.readdirSync(commandPath).forEach(dir => {
            const commands = fs.readdirSync(`${commandPath}/${dir}`).filter(file => file.endsWith('.js') || file.endsWith('.ts'));
            commands.forEach(async file => {
                const { command } = await import(`${commandPath}/${dir}/${file}`);
                this.prefixCommands.set(command.name, command);

                if (command?.aliases && command.aliases.length !== 0) {
                    command.aliases.forEach((alias: string) => {
                        this.aliases.set(alias, command.name);
                    });
                };
            })
        });
        const slashCommands: SlashCommands[] = [];
        const slashPath = path.join(__dirname, '..', 'slashCommands');
        fs.readdirSync(slashPath).forEach(dir => {
            const slash = fs.readdirSync(`${slashPath}/${dir}`).filter(file => file.endsWith('.js') || file.endsWith('.ts'));

            slash.forEach(async file => {
                const { slash } = await import(`${slashPath}/${dir}/${file}`);
                this.slashCommands.set(slash.name, slash);
                slashCommands.push(slash);
            });
        });

        this.on('ready', async () => {
            await this.application?.commands.set(slashCommands);

            this.user?.setPresence({
                activities: [{ name: "Hello!", type: 'WATCHING' }]
            });
            console.log(`[Info] ${this.user?.tag} started`)
        });

        if (process.env.MONGO) mongoose.connect(process.env.MONGO);
        mongoose.connection.on("connected", () => console.log('[Info] MongoDB connected'));
    };
};

export default bot;