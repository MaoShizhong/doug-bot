import { GOLD_CLAIM_COOLDOWN_MS, LOW_GOLD_TRHESHOLD } from '../../constants/constants';
import { gold } from '../../constants/emojis/general_emojis';
export function generateGoldString() {
    return this.gold.toLocaleString('en-GB');
}
export function checkIfLowGold() {
    return Number(this.gold) < LOW_GOLD_TRHESHOLD;
}
export function calculateDouggedPercentage() {
    const { total, dougged } = this.messages;
    const proportion = total ? dougged / total : 0;
    console.log(total, dougged, this.messages, this);
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
export function checkGoldClaimAvailability() {
    const currentTime = Date.now();
    return currentTime - Number(this.lastGoldClaim) >= GOLD_CLAIM_COOLDOWN_MS;
}
export function generateInsufficientGoldMessage() {
    return `Not enough${gold}! You currently have ${this.goldString}${gold}`;
}
