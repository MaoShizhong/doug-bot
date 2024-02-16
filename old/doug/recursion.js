const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('recursion').setDescription('An example of recursion'),
    async execute(interaction) {
        const msg = await interaction.reply({ content: '->', fetchReply: true });
        await interaction.editReply(`-> ${msg.url}`);
    },
};
