import { SlashCommandBuilder } from 'discord.js';
import { SlotMachine } from '../../games/slots/SlotMachine.js';

export default {
    data: new SlashCommandBuilder()
        .setName('slots')
        .setDescription('Try your luck at the slots!')
        .addIntegerOption((option) =>
            option
                .setName('bet')
                .setDescription('optional gold bet (min. 1 / max. 5000')
                .setMinValue(1)
                .setMaxValue(5000)
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
