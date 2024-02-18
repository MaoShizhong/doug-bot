import { SlashCommandBuilder, } from 'discord.js';
import { User } from '../../db/models/User.js';
import { FiveCardDraw } from '../../games/five_card_draw/PokerController.js';
import { getBasePokerEmbed, getHandDisplay, getResultsEmbed, } from '../../games/five_card_draw/five_card_draw_embed.js';
const command = {
    data: new SlashCommandBuilder()
        .setName('poker')
        .setDescription('Try your luck at 5 card draw!')
        .addIntegerOption((option) => option
        .setName('bet')
        .setDescription('gold bet (min. 1 / max. 5000')
        .setMinValue(1)
        .setMaxValue(5000)
        .setRequired(true)),
    async execute(interaction) {
        const interactionUser = interaction.member;
        const user = await User[interaction.guildId].findById(interactionUser.id).exec();
        const bet = interaction.options.getInteger('bet');
        if (!user) {
            await interaction.reply({ content: `Could not find user ID ${interactionUser.id}.` });
            return;
        }
        if (bet && Number(user.gold) < bet) {
            await interaction.reply(user.insufficientGoldMessage);
        }
        else {
            user.gold = Number(user.gold) - bet;
            const pokerRound = new FiveCardDraw(bet);
            await interaction.reply({
                embeds: [getBasePokerEmbed(user.profileColor, bet)],
                allowedMentions: { repliedUser: false },
            });
            const hand = getHandDisplay(pokerRound, true);
            let handDisplay = hand[0];
            /*
                Puts card emojis in normal text below multipliers embed, as embeds
                have reduced font-size. Cards will show up one by one to simulate drawing.
            */
            await interaction
                .followUp({
                content: `For ${user.name} - initial hand:\n\n${handDisplay}`,
                fetchReply: true,
            })
                .then((message) => {
                hand.slice(1).forEach((card) => {
                    handDisplay += card;
                    message.edit({
                        content: `For ${user.name} - initial hand:\n\n${handDisplay}`,
                    });
                });
                collectReactionsAndRedrawHand(message, user, pokerRound);
            });
        }
    },
};
function collectReactionsAndRedrawHand(message, account, pokerRound) {
    const validReactions = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '✅'];
    // Only accept the active player's reactions (and only valid reactions)
    const collectorFilter = (reaction, user) => {
        return user.id === account._id && validReactions.includes(reaction.emoji.name);
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
        const hand = getHandDisplay(pokerRound, false);
        let handDisplay = hand[0];
        message
            .reply({
            content: `For <@${account._id}> - after redrawing:\n\n${handDisplay}`,
            // @ts-expect-error fetchReply seems to exist but is not on the automatic type?
            fetchReply: true,
        })
            .then(async (message) => {
            hand.slice(1).forEach((card) => {
                handDisplay += card;
                message.edit({
                    content: `For <@${account._id}> - after redrawing:\n\n${handDisplay}`,
                });
            });
            // show result after previous edits
            message.edit({
                content: `For <@${account._id}> - after redrawing:\n\n${handDisplay}`,
                embeds: [await getResultsEmbed(pokerRound, account)],
            });
        });
    });
    // only react once the ReactionCollector has been created
    validReactions.forEach((emoji) => {
        message.react(emoji);
    });
}
export default command;
