import { LUCKY_STAR_CHANCE } from '../../constants/constants';
import { Reel } from './Reel';
import { Scorer } from './Scorer';
import { addBetResultsToEmbed, getInitialSlotsEmbed } from './slots_embed';
export class SlotMachine {
    NUMBER_OF_REELS;
    EMOJIS_PER_REEL;
    score;
    reels;
    reelOptions;
    player;
    bet;
    isLuckyStar;
    scorer;
    constructor(player, bet) {
        this.NUMBER_OF_REELS = 5;
        this.EMOJIS_PER_REEL = 3;
        this.score = 0;
        this.reels = Array(this.NUMBER_OF_REELS)
            .fill(null)
            .map(() => Array(this.EMOJIS_PER_REEL));
        this.reelOptions = Reel.options;
        this.player = player;
        this.bet = bet;
        this.isLuckyStar = Math.random() < LUCKY_STAR_CHANCE;
        this.scorer = new Scorer();
    }
    getSlotsResults() {
        this.playSlots();
        if (this.score && this.isLuckyStar)
            this.score *= 2;
        const resultsEmbed = getInitialSlotsEmbed(this.player, this.reels, this.scorer.matches, this.score, this.isLuckyStar);
        if (this.bet) {
            const earnings = this.bet * this.score;
            addBetResultsToEmbed(resultsEmbed, this.bet, earnings, this.player.goldString);
            this.player.gold = Number(this.player.gold) + earnings;
        }
        return resultsEmbed;
    }
    /**
     * Spin and score - provide increased rates for scoring if low total gold
     * Increasing any of the following 3 parameters to increase rates
     */
    playSlots() {
        const maxPlays = 2;
        const chanceOfRespinInPercent = 80;
        const increasedRates = this.player.hasLowGold && Math.random() < chanceOfRespinInPercent / 100;
        let plays = 0;
        do {
            this.spinReels();
            this.score = this.scorer.scoreWinningLines(this.reels);
            plays++;
        } while (!this.score && increasedRates && plays < maxPlays);
    }
    spinReels() {
        for (let i = 0; i < this.NUMBER_OF_REELS; i++) {
            this.shuffleReels(this.reelOptions);
            for (let j = 0; j < this.EMOJIS_PER_REEL; j++) {
                this.reels[i][j] = this.reelOptions[j];
            }
        }
    }
    /**
     * Fisher-Yates shuffle, less permutation-bias than other shuffle algos
     */
    shuffleReels(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
}
