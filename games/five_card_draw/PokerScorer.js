class PokerScorer {
    static multipliers = {
        royalFlush: 500,
        straightFlush: 210,
        fourOfAKind: 90,
        fullHouse: 25,
        flush: 15,
        straight: 10,
        threeOfAKind: 6,
        twoPair: 2,
        onePair: 0.5,
        highCard: 0,
    };

    static scoreHand(hand) {
        const values = hand.map((card) => card.value);
        const suits = hand.map((card) => card.suit);

        if (PokerScorer.isStraightFlush(values, suits) && values.every((value) => value > 9)) {
            return ['ROYAL FLUSH!!!', PokerScorer.multipliers.royalFlush];
        } else if (PokerScorer.isStraightFlush(values, suits)) {
            return ['Straight Flush!', PokerScorer.multipliers.straightFlush];
        } else if (PokerScorer.isFourOfAKind(values)) {
            return ['Four of a Kind!', PokerScorer.multipliers.fourOfAKind];
        } else if (PokerScorer.isFullHouse(values)) {
            return ['Full House!', PokerScorer.multipliers.fullHouse];
        } else if (PokerScorer.isFlush(suits)) {
            return ['Flush!', PokerScorer.multipliers.flush];
        } else if (PokerScorer.isStraight(values)) {
            return ['Straight!', PokerScorer.multipliers.straight];
        } else if (PokerScorer.isThreeOfAKind(values)) {
            return ['Three of a Kind!', PokerScorer.multipliers.threeOfAKind];
        } else if (PokerScorer.isTwoPair(values)) {
            return ['Two Pair', PokerScorer.multipliers.twoPair];
        } else if (PokerScorer.isOnePair(values)) {
            return ['One Pair', PokerScorer.multipliers.onePair];
        } else {
            return ['Bad luck this time...', PokerScorer.multipliers.highCard];
        }
    }

    static isOnePair(values) {
        return [...new Set(values)].length === 4;
    }

    static isTwoPair(values) {
        const duplicateNumbers = values.filter(
            (value) => values.indexOf(value) !== values.lastIndexOf(value)
        );
        return [...new Set(values)].length === 3 && [...new Set(duplicateNumbers)].length === 2;
    }

    static isThreeOfAKind(values) {
        const duplicateNumbers = values.filter(
            (value) => values.indexOf(value) !== values.lastIndexOf(value)
        );
        return [...new Set(values)].length === 3 && [...new Set(duplicateNumbers)].length === 1;
    }

    static isStraight(values) {
        const sortedNumbers = values.toSorted((a, b) => a - b);
        for (let i = 0; i < values.length - 1; i++) {
            if (sortedNumbers[i + 1] !== sortedNumbers[i] + 1) {
                return false;
            }
        }
        return true;
    }

    static isFlush(suits) {
        return suits.every((suit) => suit === suits[0]);
    }

    static isFullHouse(values) {
        const duplicateNumbers = values.filter(
            (value) => values.indexOf(value) !== values.lastIndexOf(value)
        );
        return [...new Set(values)].length === 2 && [...new Set(duplicateNumbers)].length === 2;
    }

    static isFourOfAKind(values) {
        const duplicateNumbers = values.filter(
            (value) => values.indexOf(value) !== values.lastIndexOf(value)
        );
        return [...new Set(values)].length === 2 && [...new Set(duplicateNumbers)].length === 1;
    }

    static isStraightFlush(values, suits) {
        return PokerScorer.isStraight(values) && PokerScorer.isFlush(suits);
    }
}

exports.PokerScorer = PokerScorer;
