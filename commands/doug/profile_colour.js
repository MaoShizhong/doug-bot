const { SlashCommandBuilder } = require('discord.js');
const { User } = require('../../users/User.js');
const { Storage } = require('../../local-storage.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profilecolor')
        .setDescription('Set profile colour')
        .addStringOption((option) =>
            option
                .setName('hex')
                .setDescription('6-digit hex code (# optional)')
                .setMinLength(6)
                .setMaxLength(7)
                .setRequired(true)
        ),
    async execute(interaction) {
        const option = interaction.options.getString('hex');
        const hex = option.includes('#') ? option.slice(1) : option;

        if (!/^[A-F\d]{6}$/i.test(hex)) {
            return await interaction.reply(`${option} is not a valid hex code! Please try again.`);
        }

        const color = parseInt(hex, 16);
        const account = User.users.find((user) => user.id === interaction.member.id);

        if (account.profileColor === color) {
            await interaction.reply({
                content: `Your profile already uses that color!`,
                allowedMentions: { repliedUser: false },
            });
        } else {
            account.profileColor = color;
            await interaction.reply({
                content: `Your profile color has been changed to #${hex}.`,
                allowedMentions: { repliedUser: false },
            });
            Storage.populateLocalStorage();
        }
    },
};
