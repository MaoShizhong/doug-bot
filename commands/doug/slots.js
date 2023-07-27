const { SlashCommandBuilder } = require('discord.js');
const { User } = require('../../users/User.js');
const { Storage } = require('../../local-storage.js');
const { SlotMachine } = require('../../games/slots/SlotMachine.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slots')
        .setDescription('Try your luck at the slots!')
        .addIntegerOption((option) =>
            option.setName('bet').setDescription('optional gold bet').setMinValue(1)
        ),
    async execute(interaction) {
        const account = User.users.find((user) => user.id === interaction.member.id);
        const bet = interaction.options.getInteger('bet');

        if (bet) {
            try {
                account.takeGold(bet);

                await interaction.reply({
                    embeds: [new SlotMachine().getSlotsResults(true, bet, account)],
                    allowedMentions: { repliedUser: false },
                });

                Storage.populateLocalStorage();
            } catch (e) {
                await interaction.reply(account.insufficientGoldMessage);
            }
        } else {
            await interaction.reply({
                embeds: [new SlotMachine().getSlotsResults(false, 0, account)],
                allowedMentions: { repliedUser: false },
            });
        }
    },
};
