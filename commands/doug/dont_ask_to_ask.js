const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('data').setDescription("Don't ask to ask!"),
    async execute(interaction) {
        await interaction.reply({
            content: '<https://dontasktoask.com/>',
            allowedMentions: { repliedUser: false },
        });
    },
};