import { SlashCommandBuilder } from 'discord.js';
import { getDougBoard } from '../../embeds/dougboard_embed.js';

export default {
    data: new SlashCommandBuilder().setName('dougboard').setDescription('Who has gotten dougged the most?'),
    async execute(interaction) {
        await interaction.reply({ embeds: [getDougBoard()] });
    },
};
