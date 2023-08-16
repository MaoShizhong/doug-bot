const { Scorer } = require('./Scorer.js');
const embeds = require('./slots_embed.js');
const { Reel } = require('./Reel.js');

class SlotMachine {
    constructor() {
        this.NUMBER_OF_REELS = 5;
        this.EMOJIS_PER_REEL = 3;
        this.score = 0;
        this.reels = Array(this.NUMBER_OF_REELS)
            .fill()
            .map(() => Array(this.EMOJIS_PER_REEL));
        this.reelOptions = Reel.options;
    }

    getSlotsResults(betPlaced, bet, user) {
        this.playSlots(user);

        let resultsEmbed = embeds.getInitialSlotsEmbed(user, this.reels, Scorer.matches);

        const isLuckyStar = this.isLuckyStar();
        if (isLuckyStar) {
            this.score *= 2;
        }

        resultsEmbed = embeds.addScoreFields(resultsEmbed, this.score, isLuckyStar);

        if (betPlaced) {
            const earnings = bet * this.score;
            user.giveGold(earnings);

            resultsEmbed = embeds.addBetResults(resultsEmbed, bet, earnings, user);
        }

        return resultsEmbed;
    }

    /* 
        Spin and score - provide increased rates for scoring if low total gold
        Increasing any of the following 3 parameters to increase rates
    */
    playSlots(user) {
        const maxPlays = 2;
        const chanceOfRespinInPercent = 80;

        const increasedRates = user.hasLowGold && Math.random < chanceOfRespinInPercent / 100;

        let plays = 0;

        do {
            this.spinReels();
            this.score = Scorer.scoreWinningLines(this.reels);
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
    /*
        Fisher-Yates shuffle, less permutation-bias than other shuffle algos
    */
    shuffleReels(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    isLuckyStar() {
        const chanceOfLuckyStarInPercent = 5;
        return this.score && Math.random() < chanceOfLuckyStarInPercent / 100;
    }
}

exports.SlotMachine = SlotMachine;
