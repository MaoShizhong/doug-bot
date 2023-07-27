const { SlashCommandBuilder } = require('discord.js');
const { randomDavidMsg } = require('../../utils/responses.js');

module.exports = {
    data: new SlashCommandBuilder().setName('david').setDescription("I'm better"),
    async execute(interaction) {
        await interaction.reply(randomDavidMsg());
    },
};
