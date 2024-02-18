import { CardValue, Suit, type Card } from './PokerController.js';

export class PokerScorer {
    static multipliers = {
        royalFlush: 500,
        straightFlush: 210,
        fourOfAKind: 90,
        fullHouse: 28,
        flush: 17,
        straight: 12,
        threeOfAKind: 6,
        twoPair: 3,
        onePair: 1,
        highCard: 0,
    } as const;

    /**
     * Unsure if better way to write this more readably?
     * Issue is each check is a unique type of check with a specific name.
     * Reduced repetition and unnecessary additional static methods for other
     * checks that used the same processes simply with different outcomes.
     * Still feels slightly repetitive?
     */
    static scoreHand(hand: Card[]): [string, number] {
        const pips = hand.map((card): CardValue => card.value);
        const duplicates = pips.filter(
            (pip): boolean => pips.indexOf(pip) !== pips.lastIndexOf(pip)
        );

        const uniquePips = [...new Set(pips)];
        const uniqueDuplicates = [...new Set(duplicates)];

        const uniqueSuits = [...new Set(hand.map((card): Suit => card.suit))];

        // Standard cuddled formatting makes this a nightmare to read
        // prettier-ignore
        if (PokerScorer.isStraightFlush(uniquePips, uniqueSuits)) {
            return uniquePips.every((pip): boolean => pip > 9)
                ? ['ROYAL FLUSH!!!', PokerScorer.multipliers.royalFlush]
                : ['Straight Flush!', PokerScorer.multipliers.straightFlush];
        }
        else if (uniquePips.length === 2 && uniqueDuplicates.length === 1) {
            return ['Four of a Kind!', PokerScorer.multipliers.fourOfAKind];
        }
        else if (uniquePips.length === 2 && uniqueDuplicates.length === 2) {
            return ['Full House!', PokerScorer.multipliers.fullHouse];
        }
        else if (uniqueSuits.length === 1) {
            return ['Flush!', PokerScorer.multipliers.flush];
        }
        else if (PokerScorer.isStraight(uniquePips)) {
            return ['Straight!', PokerScorer.multipliers.straight];
        }
        else if (uniquePips.length === 3 && uniqueDuplicates.length === 1) {
            return ['Three of a Kind!', PokerScorer.multipliers.threeOfAKind];
        }
        else if (uniquePips.length === 3 && uniqueDuplicates.length === 2) {
            return ['Two Pair', PokerScorer.multipliers.twoPair];
        }
        else if (uniquePips.length === 4) {
            return ['One Pair', PokerScorer.multipliers.onePair];
        }
        else {
            return ['Bad luck this time...', PokerScorer.multipliers.highCard];
        }
    }

    static isStraight(pips: CardValue[]): boolean {
        if (pips.length !== 5) return false;

        const sortedPips = pips.toSorted((a, b): number => a - b);

        // covers all valid straight combinations - A-5 separate as A has a value of 14 (ace-high)
        const isFiveConsecutivePips = sortedPips[4] - sortedPips[0] === 4;
        const isAceThroughFive = [2, 3, 4, 5, 14].every(
            (number, i): boolean => number === sortedPips[i]
        );

        return isFiveConsecutivePips || isAceThroughFive;
    }

    static isStraightFlush(pips: CardValue[], uniqueSuits: Suit[]): boolean {
        return PokerScorer.isStraight(pips) && uniqueSuits.length === 1;
    }
}
