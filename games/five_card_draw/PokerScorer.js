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

    /*
        Unsure if better way to write this more readably?
        Issue is each check is a unique type of check with a specific name.
        Could possibly combine some of the repetitive functions into one where
        the numbers for lengths are passed in as args but then comments would be
        required for readability/naming - better to just keep this way?
    */
    static scoreHand(hand) {
        const values = hand.map((card) => card.value);
        const suits = hand.map((card) => card.suit);

        const duplicateNumbers = values.filter(
            (value) => values.indexOf(value) !== values.lastIndexOf(value)
        );

        // prettier-ignore
        if (PokerScorer.isStraightFlush(values, suits) && values.every((value) => value > 9)) {
            return ['ROYAL FLUSH!!!', PokerScorer.multipliers.royalFlush];
        }
        else if (PokerScorer.isStraightFlush(values, suits)) {
            return ['Straight Flush!', PokerScorer.multipliers.straightFlush];
        }
        else if (PokerScorer.isFourOfAKind(values, duplicateNumbers)) {
            return ['Four of a Kind!', PokerScorer.multipliers.fourOfAKind];
        }
        else if (PokerScorer.isFullHouse(values, duplicateNumbers)) {
            return ['Full House!', PokerScorer.multipliers.fullHouse];
        }
        else if (PokerScorer.isFlush(suits)) {
            return ['Flush!', PokerScorer.multipliers.flush];
        }
        else if (PokerScorer.isStraight(values)) {
            return ['Straight!', PokerScorer.multipliers.straight];
        }
        else if (PokerScorer.isThreeOfAKind(values, duplicateNumbers)) {
            return ['Three of a Kind!', PokerScorer.multipliers.threeOfAKind];
        }
        else if (PokerScorer.isTwoPair(values, duplicateNumbers)) {
            return ['Two Pair', PokerScorer.multipliers.twoPair];
        }
        else if (PokerScorer.isOnePair(values)) {
            return ['One Pair', PokerScorer.multipliers.onePair];
        }
        else {
            return ['Bad luck this time...', PokerScorer.multipliers.highCard];
        }
    }

    static isOnePair(values) {
        return [...new Set(values)].length === 4;
    }

    static isTwoPair(values, duplicateNumbers) {
        return [...new Set(values)].length === 3 && [...new Set(duplicateNumbers)].length === 2;
    }

    static isThreeOfAKind(values, duplicateNumbers) {
        return [...new Set(values)].length === 3 && [...new Set(duplicateNumbers)].length === 1;
    }

    static isStraight(values) {
        const sortedNumbers = values.toSorted((a, b) => a - b);

        // covers all valid straight combinations - A-5 separate as A has a value of 14 (ace-high)
        const isFiveConsecutiveNumbers = sortedNumbers[4] - sortedNumbers[0] === 4;
        const isAceThroughFive = [2, 3, 4, 5, 14].every((number, i) => number === sortedNumbers[i]);

        return isFiveConsecutiveNumbers || isAceThroughFive;
    }

    static isFlush(suits) {
        return suits.every((suit) => suit === suits[0]);
    }

    static isFullHouse(values, duplicateNumbers) {
        return [...new Set(values)].length === 2 && [...new Set(duplicateNumbers)].length === 2;
    }

    static isFourOfAKind(values, duplicateNumbers) {
        return [...new Set(values)].length === 2 && [...new Set(duplicateNumbers)].length === 1;
    }

    static isStraightFlush(values, suits) {
        return PokerScorer.isStraight(values) && PokerScorer.isFlush(suits);
    }
}

exports.PokerScorer = PokerScorer;
