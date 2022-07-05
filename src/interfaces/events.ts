import Client from "../client";
import Discord from "discord.js";

interface Run {
    (client: Client, ...args: any[]): any;
}

export interface Events {
    name: keyof Discord.ClientEvents;
    run: Run;
}