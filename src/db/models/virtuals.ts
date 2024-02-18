import { GOLD_CLAIM_COOLDOWN_MS, LOW_GOLD_TRHESHOLD } from '../../constants/constants.js';
import { gold } from '../../constants/emojis/general_emojis.js';
import { type UserModel } from './User.js';

export function generateGoldString(this: UserModel): string {
    return this.gold.toLocaleString('en-GB');
}

export function checkIfLowGold(this: UserModel): boolean {
    return Number(this.gold) < LOW_GOLD_TRHESHOLD;
}

export function calculateDouggedPercentage(this: UserModel): string {
    const { total, dougged } = this.messages;
    const proportion = total ? dougged / total : 0;

    return proportion === 1
        ? '100.0%'
        : proportion
              .toLocaleString('en-GB', {
                  // @ts-expect-error Intl.NumberFormatOptions.trailingZeroDisplay missing from interface
                  trailingZeroDisplay: 'auto',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  style: 'percent',
              })
              .padStart(6, '0');
}

export function checkGoldClaimAvailability(this: UserModel): boolean {
    const currentTime = Date.now();
    return currentTime - Number(this.lastGoldClaim) >= GOLD_CLAIM_COOLDOWN_MS;
}

export function generateInsufficientGoldMessage(this: UserModel): string {
    return `Not enough${gold}! You currently have ${this.goldString}${gold}`;
}
