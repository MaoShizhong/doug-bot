import { SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../../types.js';

const command: SlashCommand = {
    data: new SlashCommandBuilder().setName('recursion').setDescription('An example of recursion'),
    async execute(interaction): Promise<void> {
        const msg = await interaction.reply({ content: '->', fetchReply: true });
        await interaction.editReply(`-> ${msg.url}`);
    },
};

export default command;
