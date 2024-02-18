import { SlashCommandBuilder } from 'discord.js';
import { image, patterns } from '../../embeds/slot_patterns_embed';
import { SlashCommand } from '../../types';

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('slotpatterns')
        .setDescription('Shows the 11 match lines for slots.'),
    async execute(interaction): Promise<void> {
        await interaction.reply({ embeds: [patterns], files: [image] });
    },
};

export default command;
