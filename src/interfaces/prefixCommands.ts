import Client from "../client";
import Discord from "discord.js";

interface Run {
    ( client: Client, message: Discord.Message, args: string[] ): any;
};

export interface PrefixCommands {
    name: string;
    description: string;
    aliases?: string[];
    usage?: string;
    permissions?: Discord.PermissionResolvable[];
    run: Run;
};

