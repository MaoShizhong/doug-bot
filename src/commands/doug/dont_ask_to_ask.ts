import { SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../../types.js';

const command: SlashCommand = {
    data: new SlashCommandBuilder().setName('data').setDescription("Don't ask to ask!"),
    async execute(interaction): Promise<void> {
        await interaction.reply({
            content: '<https://dontasktoask.com/>',
            allowedMentions: { repliedUser: false },
        });
    },
};

export default command;
