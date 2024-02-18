import { SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../../types';

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('interesting')
        .setDescription('Really interesting Harvard facts!'),
    async execute(interaction) {
        await interaction.reply({
            content:
                '[www.discoverwalks.com/blog/united-states/10-astonishing-facts-about-harvard-university/](<https://www.youtube.com/watch?v=dQw4w9WgXcQ>)',
            allowedMentions: { repliedUser: false },
        });
    },
};

export default command;