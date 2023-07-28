const { SlashCommandBuilder } = require('discord.js');
const { randomResponse } = require('../../utils/responses.js');

module.exports = {
    data: new SlashCommandBuilder().setName('doug').setDescription('Gaze upon my beauty!'),
    async execute(interaction) {
        await interaction.reply(randomResponse('doug'));
    },
};
