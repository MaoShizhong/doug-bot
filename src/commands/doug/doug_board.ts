const { SlashCommandBuilder } = require('discord.js');
const { getDougBoard } = require('../../embeds/dougboard_embed.js');

module.exports = {
    data: new SlashCommandBuilder().setName('dougboard').setDescription('Who has gotten dougged the most?'),
    async execute(interaction) {
        await interaction.reply({ embeds: [getDougBoard()] });
    },
};
