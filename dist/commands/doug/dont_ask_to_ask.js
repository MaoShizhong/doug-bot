import { SlashCommandBuilder } from 'discord.js';
const command = {
    data: new SlashCommandBuilder().setName('data').setDescription("Don't ask to ask!"),
    async execute(interaction) {
        await interaction.reply({
            content: '<https://dontasktoask.com/>',
            allowedMentions: { repliedUser: false },
        });
    },
};
export default command;
