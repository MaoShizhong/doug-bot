import { EmbedBuilder } from 'discord.js';
import { gold } from '../../constants/emojis/general_emojis';
import { PokerScorer } from './PokerScorer';
export function getBasePokerEmbed(color, bet) {
    const space = '\u2004\u2004';
    return new EmbedBuilder()
        .setColor(color)
        .setTitle('Five card draw!')
        .addFields({
        name: 'Multipliers',
        value: `**Royal Flush:**${space}${PokerScorer.multipliers.royalFlush}\n` +
            `**Straight Flush:**${space}${PokerScorer.multipliers.straightFlush}\n` +
            `**Four of a Kind:**${space}${PokerScorer.multipliers.fourOfAKind}\n` +
            `**Full House:**${space}${PokerScorer.multipliers.fullHouse}\n` +
            `**Flush:**${space}${PokerScorer.multipliers.flush}\n`,
        inline: true,
    }, {
        name: '\u200b',
        value: `**Straight:**${space}${PokerScorer.multipliers.straight}\n` +
            `**Three of a Kind:**${space}${PokerScorer.multipliers.threeOfAKind}\n` +
            `**Two Pair:**${space}${PokerScorer.multipliers.twoPair}\n` +
            `**One Pair:**${space}${PokerScorer.multipliers.onePair}\n`,
        inline: true,
    }, {
        name: 'How to play',
        value: 'Click the :white_check_mark: to redraw your hand.\n' +
            'React with any numbers to **hold** the respective card(s)\n' +
            "(Only the active player's reacts will count)\n" +
            '\nYour hand will automatically redraw with any selected holds if the :white_check_mark: has not been selected after 30s.',
    }, {
        name: 'Bet',
        value: `${bet.toLocaleString('en-US')}${gold}`,
    });
}
export async function getResultsEmbed(pokerRound, account) {
    const [result, multiplier, winnings] = pokerRound.scoreHand();
    account.gold = Number(account.gold) + winnings;
    // @ts-expect-error .save() does exist but the correct Mongoose type is very long - not yet figured out how best to resolve
    await account.save();
    return new EmbedBuilder()
        .setColor(account.profileColor)
        .setTitle(`${result} (x${multiplier} multiplier)`)
        .addFields({
        name: 'Bet',
        value: `${pokerRound.bet.toLocaleString('en-US')}${gold}`,
        inline: true,
    }, {
        name: 'Winnings (bet * multiplier)',
        value: `${winnings.toLocaleString('en-US')}${gold}`,
        inline: true,
    }, { name: 'Current gold', value: `${account.goldString}${gold}` });
}
export function getHandDisplay(pokerRound, isFirstHand) {
    const hand = isFirstHand ? pokerRound.hand : pokerRound.generateRedrawnHand();
    const handDisplay = [];
    hand.forEach((card) => {
        handDisplay.push(`\u2004${card.emoji}${'\u2004'.repeat(4)}`);
    });
    return handDisplay;
}
