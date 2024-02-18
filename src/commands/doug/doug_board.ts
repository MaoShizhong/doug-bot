import { APIEmbed, SlashCommandBuilder } from 'discord.js';
import { getDougBoard } from '../../embeds/dougboard_embed';
import { SlashCommand } from '../../types';

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('dougboard')
        .setDescription('Who has gotten dougged the most?'),
    async execute(interaction): Promise<void> {
        const dougBoard = getDougBoard(interaction.guildId as string);
        await interaction.reply({ embeds: [dougBoard as APIEmbed] });
    },
};

export default command;
