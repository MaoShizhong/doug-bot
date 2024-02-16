const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('brian').setDescription("This guy isn't too bad either"),
    async execute(interaction) {
        await interaction.reply({ content: 'As some might say, what a lad!', files: ['./images/brian.jpg'] });
    },
};
