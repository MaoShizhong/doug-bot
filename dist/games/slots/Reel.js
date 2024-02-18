import { arthur, barFalse, barTrue, doug, liquidDrinkers, python, rickroll, rip, scratch, } from '../../constants/emojis/slots_emojis';
export class Reel {
    static match5 = {
        common: 15,
        rare: 45,
        epic: 180,
        legendary: 500,
        mythic: 1200,
    };
    static match4 = {
        common: 5,
        rare: 15,
        epic: 50,
        legendary: 125,
        mythic: 350,
    };
    static match3 = {
        common: 1,
        rare: 4,
        epic: 12,
        legendary: 25,
        mythic: 50,
    };
    static emojis = {
        barFalse: {
            quantity: 4,
            emoji: barFalse,
            match5: Reel.match5.common,
            match4: Reel.match4.common,
            match3: Reel.match3.common,
        },
        rip: {
            quantity: 4,
            emoji: rip,
            match5: Reel.match5.common,
            match4: Reel.match4.common,
            match3: Reel.match3.common,
        },
        scratch: {
            quantity: 4,
            emoji: scratch,
            match5: Reel.match5.common,
            match4: Reel.match4.common,
            match3: Reel.match3.common,
        },
        rickroll: {
            quantity: 4,
            emoji: rickroll,
            match5: Reel.match5.rare,
            match4: Reel.match4.rare,
            match3: Reel.match3.rare,
        },
        arthur: {
            quantity: 4,
            emoji: arthur,
            match5: Reel.match5.rare,
            match4: Reel.match4.rare,
            match3: Reel.match3.rare,
        },
        python: {
            quantity: 3,
            emoji: python,
            match5: Reel.match5.epic,
            match4: Reel.match4.epic,
            match3: Reel.match3.epic,
        },
        barTrue: {
            quantity: 3,
            emoji: barTrue,
            match5: Reel.match5.epic,
            match4: Reel.match4.epic,
            match3: Reel.match3.epic,
        },
        liquidDrinkers: {
            quantity: 2,
            emoji: liquidDrinkers,
            match5: Reel.match5.legendary,
            match4: Reel.match4.legendary,
            match3: Reel.match3.legendary,
        },
        doug: {
            quantity: 1,
            emoji: doug,
            match5: Reel.match5.mythic,
            match4: Reel.match4.mythic,
            match3: Reel.match3.mythic,
        },
    };
    static get options() {
        const reelOptions = [];
        for (const emoji of Object.values(Reel.emojis)) {
            for (let i = 0; i < emoji.quantity; i++) {
                reelOptions.push(emoji);
            }
        }
        return reelOptions;
    }
}
