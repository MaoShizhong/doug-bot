const { SlashCommandBuilder } = require('discord.js');
const { gold } = require('../../emojis/general_emojis.js');
const { Storage } = require('../../local-storage.js');
const { User } = require('../../users/User.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gold')
        .setDescription(`Claim ${User.goldClaimAmount} free gold - cooldown: 60 minutes`),
    async execute(interaction) {
        const user = User.users.find((user) => user.id === interaction.member.id);

        if (user.hasGoldClaimAvailable) {
            user.giveGold(User.goldClaimAmount);
            user.lastGoldClaim = Date.now();
            Storage.populateLocalStorage();

            await interaction.reply({
                content:
                    `+${User.goldClaimAmount}${gold}! ` +
                    `You currently have ${user.goldString}${gold}\n` +
                    `You may claim ${
                        User.goldClaimAmount
                    }${gold}for free up to once every hour. Your next claim will be available in ${Math.round(
                        User.goldClaimCooldownInMS / 60000
                    )} minutes.`,
                allowedMentions: { repliedUser: false },
            });
        } else {
            const remainingTimeInMS = Date.now() - user.lastGoldClaim;
            const remainingTimeInMins = 60 - ~~(remainingTimeInMS / 60000);

            await interaction.reply({
                content: `Sorry, you have already claimed ${gold} within the last hour! You may claim again in ${remainingTimeInMins} ${
                    remainingTimeInMins === 1 ? 'minute' : 'minutes'
                }.`,
                allowedMentions: { repliedUser: false },
            });
        }
    },
};
