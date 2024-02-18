import { DOUG_REACT_NONGUARANTEED_CHANCE } from '../constants/constants';
/**
 * If a message contains at least one of each `d/o/u/g` then there is a
 * small chance that the bot reacts with a doug emoji.
 * This chance is bumped up to 100% if those letters appear in that order
 * at any point (even with non-doug letters inbetween).
 */
export function containsDoug(msg) {
    const arr = msg.match(/d|o|u|g/g) ?? [];
    if (arr.join('').includes('doug')) {
        return true;
    }
    else if ([...new Set(arr)].length === 4) {
        return Math.random() < DOUG_REACT_NONGUARANTEED_CHANCE;
    }
    else {
        return false;
    }
}
