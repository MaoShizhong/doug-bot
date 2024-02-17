import { Client, Collection, Interaction, SlashCommandBuilder } from 'discord.js';

export type SlashCommand = {
    data: SlashCommandBuilder;
    execute: (interaction: Interaction) => Promise<void>;
};

export interface IBotClient extends Client {
    commands: Collection<string, SlashCommand>;
}
