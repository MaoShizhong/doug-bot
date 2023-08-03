const { PokerScorer } = require('./PokerScorer.js');
const playingCards = require('../../emojis/play_card_emojis.js');

class FiveCardDraw {
    constructor(bet = 0) {
        //this.user = user;
        this.bet = bet;
        this.deck = FiveCardDraw.shuffledDeck;
        this.hand;
        this.undrawnCards;
    }

    playFirstHand() {
        this.hand = this.deck.slice(0, 5);
        this.undrawnCards = this.deck.slice(5);

        return this.hand;
    }

    playRedrawnHand() {
        this.hand = this.hand.map((card) => {
            return card.redraw ? this.undrawnCards.shift() : card;
        });

        return this.hand;
    }

    scoreHand() {
        const [result, multiplier] = PokerScorer.scoreHand(this.hand);

        return [result, multiplier, this.bet * multiplier];
    }

    // Ace given value of 14 since ace is high - easier checking for royal flush
    static cardValues = [14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    static suits = ['diamonds', 'clubs', 'hearts', 'spades'];

    static get shuffledDeck() {
        const deck = [];

        // All cards to be redrawn by default - player can opt to hold specific cards
        FiveCardDraw.cardValues.forEach((value) => {
            FiveCardDraw.suits.forEach((suit) => {
                // push with filenames
                deck.push({
                    value: value,
                    suit: suit,
                    emoji: playingCards[suit][value],
                    redraw: true,
                });
            });
        });

        // Fisher-Yates shuffle, less permutation-bias than other shuffle algos
        for (let i = deck.length - 1; i > 0; i--) {
            let j = ~~(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }

        return deck;
    }
}

exports.FiveCardDraw = FiveCardDraw;
