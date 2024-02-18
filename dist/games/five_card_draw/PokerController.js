import playingCards from '../../constants/emojis/play_card_emojis';
import { PokerScorer } from './PokerScorer';
// Ace given value of 14 since ace is high - easier checking for royal flush
const CARD_VALUES = [14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const SUITS = ['diamonds', 'clubs', 'hearts', 'spades'];
export class FiveCardDraw {
    bet;
    deck;
    hand;
    undrawnCards;
    static HAND_SIZE = 5;
    constructor(bet = 0) {
        //this.user = user;
        this.bet = bet;
        this.deck = this.generateShuffledDeck();
        this.hand = this.deck.slice(0, FiveCardDraw.HAND_SIZE);
        this.undrawnCards = this.deck.slice(FiveCardDraw.HAND_SIZE);
    }
    generateRedrawnHand() {
        this.hand = this.hand.map((card) => {
            return card.redraw ? this.undrawnCards.shift() : card;
        });
        return this.hand;
    }
    scoreHand() {
        const [result, multiplier] = PokerScorer.scoreHand(this.hand);
        return [result, multiplier, this.bet * multiplier];
    }
    generateShuffledDeck() {
        const deck = [];
        // All cards to be redrawn by default - player can opt to hold specific cards
        CARD_VALUES.forEach((value) => {
            SUITS.forEach((suit) => {
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
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }
}
