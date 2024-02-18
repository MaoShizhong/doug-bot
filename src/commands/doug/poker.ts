const { SlashCommandBuilder } = require('discord.js');
const { User } = require('../../users/User.js');
const { Storage } = require('../../local-storage.js');
const poker = require('../../games/five_card_draw/five_card_draw_embed.js');
const { FiveCardDraw } = require('../../games/five_card_draw/PokerController.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poker')
        .setDescription('Try your luck at 5 card draw!')
        .addIntegerOption((option) =>
            option
                .setName('bet')
                .setDescription('gold bet (min. 1 / max. 5000')
                .setMinValue(1)
                .setMaxValue(5000)
                .setRequired(true)
        ),
    async execute(interaction) {
        const account = User.users.find((user) => user.id === interaction.member.id);
        const bet = interaction.options.getInteger('bet');

        try {
            account.takeGold(bet);
            const pokerRound = new FiveCardDraw(bet);

            await interaction.reply({
                embeds: [poker.getBasePokerEmbed(account, bet)],

                allowedMentions: { repliedUser: false },
            });

            const hand = poker.getHandDisplay(pokerRound, true);
            let handDisplay = hand[0];

            /* 
                Puts card emojis in normal text below multipliers embed, as embeds
                have reduced font-size. Cards will show up one by one to simulate drawing.
            */
            await interaction
                .followUp({
                    content: `For ${account.name} - initial hand:\n\n${handDisplay}`,
                    fetchReply: true,
                })
                .then((message) => {
                    hand.slice(1).forEach((card) => {
                        handDisplay += card;
                        message.edit({
                            content: `For ${account.name} - initial hand:\n\n${handDisplay}`,
                        });
                    });
                    collectReactionsAndRedrawHand(message, account, pokerRound);
                });

            Storage.populateLocalStorage();
        } catch (e) {
            console.log(e);
            return await interaction.reply(account.insufficientGoldMessage);
        }
    },
};

function collectReactionsAndRedrawHand(message, account, pokerRound) {
    const validReactions = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '✅'];

    /* 
        Only accept the active player's reactions (and only valid reactions)
    */
    const collectorFilter = (reaction, user) => {
        return user.id === account.id && validReactions.includes(reaction.emoji.name);
    };

    const collector = message.createReactionCollector({
        filter: collectorFilter,
        dispose: true,
        time: 30000,
    });

    const changePage = (reaction, pokerRound) => {
        if (reaction.emoji.name === '✅') {
            collector.stop();
            return;
        }

        const cardToHold = validReactions.indexOf(reaction.emoji.name);
        pokerRound.hand[cardToHold].redraw = !pokerRound.hand[cardToHold].redraw;
    };

    collector.on('collect', (reaction) => changePage(reaction, pokerRound));
    collector.on('remove', (reaction) => changePage(reaction, pokerRound));
    collector.on('end', () => {
        const hand = poker.getHandDisplay(pokerRound, false);
        let handDisplay = hand[0];

        message
            .reply({
                content: `For <@${account.id}> - after redrawing:\n\n${handDisplay}`,

                fetchReply: true,
            })
            .then((message) => {
                hand.slice(1).forEach((card) => {
                    handDisplay += card;
                    message.edit({
                        content: `For <@${account.id}> - after redrawing:\n\n${handDisplay}`,
                    });
                });

                // show result after previous edits
                message.edit({
                    content: `For <@${account.id}> - after redrawing:\n\n${handDisplay}`,
                    embeds: [poker.getResultsEmbed(pokerRound, account)],
                });
            });
    });

    // only react once the ReactionCollector has been created
    validReactions.forEach((emoji) => message.react(emoji));
}
