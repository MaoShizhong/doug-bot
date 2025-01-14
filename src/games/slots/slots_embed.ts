import { EmbedBuilder } from 'discord.js';
import { gold } from '../../constants/emojis/general_emojis.js';
import {
    arthur,
    barFalse,
    barTrue,
    doug,
    liquidDrinkers,
    python,
    rickroll,
    rip,
    scratch,
} from '../../constants/emojis/slots_emojis.js';
import { UserModel } from '../../db/models/User.js';
import { SlotEmoji } from '../../types.js';
import { Match, MatchInfo } from './Scorer.js';

function renderReels(reels: SlotEmoji[][]): string {
    const space = '\u2004\u2004';

    const leftReelEdge = `|${space}`;
    const midReelEdges = `${space}|${space}`;
    const rightReelEdge = `${space}|`;

    let results = '';

    for (let i = 0; i < reels[0].length; i++) {
        results += `${leftReelEdge}${reels[0][i].emoji}${midReelEdges}${reels[1][i].emoji}${midReelEdges}${reels[2][i].emoji}${midReelEdges}${reels[3][i].emoji}${midReelEdges}${reels[4][i].emoji}${rightReelEdge}\n`;
    }

    return results;
}

/*
    For showing individual matches (line #, emojis, value) in the results embed
*/
function renderMatchLine(matchLine: string, emojis: SlotEmoji[]): string {
    let str = `Line ${matchLine} `;

    emojis.forEach((matchedEmoji): void => {
        str += matchedEmoji.emoji;
    });

    const matchQuantity = `match${emojis.length}` as Match;
    str += ` ${emojis[0][matchQuantity]} points`;

    return str;
}

export function getInitialSlotsEmbed(
    user: UserModel,
    reels: SlotEmoji[][],
    matches: MatchInfo[],
    score: number,
    isLuckyStar: boolean
): EmbedBuilder {
    const renderedReels = renderReels(reels);

    const resultsEmbed = new EmbedBuilder()
        .setColor(user.profileColor)
        .setTitle('Slots!')
        .addFields(
            {
                name: 'Rolling slots!',
                value: 'Match 3, 4 or 5 (starting from the first reel\nor ending with the last reel) to score points!\nUse `/slotpatterns` to see the 11 match lines.',
            },
            {
                name: 'Symbols:',
                value: `${barFalse} ${rip} ${scratch} **Match 3/4/5**: 1 / 5 / 15\n${rickroll} ${arthur} **Match 3/4/5:** 4 / 15 / 45\n${python} ${barTrue} **Match 3/4/5:** 12 / 50 / 180\n${liquidDrinkers} **Match 3/4/5:** 25 / 125 / 500\n${doug} **Match 3/4/5:** 50 / 350 / 1200`,
            },
            {
                name: '\u200b',
                value: renderedReels,
            }
        );

    matches.forEach(([emojis, patternNumber]): void => {
        resultsEmbed.addFields({
            name: '\u200b',
            value: renderMatchLine(patternNumber, emojis),
            inline: true,
        });
    });

    addScoreFieldsToEmbed(resultsEmbed, score, isLuckyStar);
    return resultsEmbed;
}

// For score announcement in results embed
function addScoreFieldsToEmbed(embed: EmbedBuilder, score: number, isLuckyStar: boolean): void {
    // Changes score announcement tone depending on score
    const extraMessages = {
        '...what the...': 400,
        '...holy hell!': 280,
        '! Wow!': 125,
        '! Really nice!': 45,
        '! Nice!': 15,
        '!': 1,
    };

    let extraMessage = '...';
    for (const [message, threshold] of Object.entries(extraMessages)) {
        if (score >= threshold) {
            extraMessage = message;
            break;
        }
    }

    embed.addFields({
        name: isLuckyStar ? ':star: :star: **Lucky stars!** :star: :star:' : 'Score:',
        value: isLuckyStar
            ? `Your score of ${
                  score / 2
              } points has been doubled to **${score}** points${extraMessage}`
            : `You scored **${score}** points${extraMessage}`,
    });
}

export function addBetResultsToEmbed(
    embed: EmbedBuilder,
    bet: number,
    earnings: number,
    userGoldString: string
): void {
    embed.addFields(
        { name: 'Bet placed', value: `${bet.toLocaleString('en-US')}${gold}`, inline: true },
        {
            name: 'Winnings (bet * score)',
            value: `${earnings.toLocaleString('en-US')}${gold}`,
            inline: true,
        },
        { name: 'Current gold', value: `${Number(userGoldString) + earnings}${gold}` }
    );

    return;
}
