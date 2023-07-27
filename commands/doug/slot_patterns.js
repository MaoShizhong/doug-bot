const { SlashCommandBuilder } = require('discord.js');
const { patterns, image } = require('../../embeds/slot_patterns_embed.js');

module.exports = {
    data: new SlashCommandBuilder().setName('slotpatterns').setDescription('Shows the 11 match lines for slots.'),
    async execute(interaction) {
        await interaction.reply({ embeds: [patterns], files: [image] });
    },
};
