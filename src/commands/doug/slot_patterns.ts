import { SlashCommandBuilder } from 'discord.js';
import { image, patterns } from '../../embeds/slot_patterns_embed.js';

export default {
    data: new SlashCommandBuilder()
        .setName('slotpatterns')
        .setDescription('Shows the 11 match lines for slots.'),
    async execute(interaction) {
        await interaction.reply({ embeds: [patterns], files: [image] });
    },
};
