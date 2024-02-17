const { SlashCommandBuilder } = require('discord.js');
const { dickbutt } = require('../../images/dickbutt.js');

module.exports = {
    data: new SlashCommandBuilder().setName('nsfw').setDescription(':)'),
    async execute(interaction) {
        await interaction.reply(dickbutt);
    },
};
