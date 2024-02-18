import { SlashCommandBuilder } from 'discord.js';
import { getDougBoard } from '../../embeds/dougboard_embed.js';
const command = {
    data: new SlashCommandBuilder()
        .setName('dougboard')
        .setDescription('Who has gotten dougged the most?'),
    async execute(interaction) {
        const dougBoard = await getDougBoard(interaction.guildId);
        await interaction.reply({ embeds: [dougBoard] });
    },
};
export default command;
