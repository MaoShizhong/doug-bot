import { ChatInputCommandInteraction, Client, Collection, SlashCommandBuilder } from 'discord.js';

export type SlashCommand = {
    data: SlashCommandBuilder | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
};

export interface IBotClient extends Client {
    commands: Collection<string, SlashCommand>;
}

export type SlotEmoji = {
    quantity: number;
    emoji: string;
    match5: number;
    match4: number;
    match3: number;
};
