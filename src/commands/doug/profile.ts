const { SlashCommandBuilder } = require('discord.js');
const { showProfile } = require('../../embeds/profile_embed.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('showprofile')
        .setDescription('Display your profile (or provide a user ID to show a specific profile)')
        .addStringOption((option) => option.setName('id').setDescription('ID of user to show profile for (optional)')),
    async execute(interaction) {
        const userID = interaction.options.getString('id') ?? interaction.member.id;

        await interaction.reply({ embeds: [showProfile(userID)] });
    },
};
