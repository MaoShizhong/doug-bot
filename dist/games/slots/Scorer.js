export class Scorer {
    matches = [];
    /**
     * For scalability, this can be refactored to assign an object of
     * win lines based on a separate file with
     * different configurations (e.g. simpler/more complex patterns,
     * different sized/number of reels) by passing in additional arguments
     */
    scoreWinningLines(reels) {
        const winLines = {
            1: [reels[0][1], reels[1][1], reels[2][1], reels[3][1], reels[4][1]],
            2: [reels[0][0], reels[1][0], reels[2][0], reels[3][0], reels[4][0]],
            3: [reels[0][2], reels[1][2], reels[2][2], reels[3][2], reels[4][2]],
            4: [reels[0][0], reels[1][1], reels[2][2], reels[3][1], reels[4][0]],
            5: [reels[0][2], reels[1][1], reels[2][0], reels[3][1], reels[4][2]],
            6: [reels[0][1], reels[1][2], reels[2][2], reels[3][2], reels[4][1]],
            7: [reels[0][1], reels[1][0], reels[2][0], reels[3][0], reels[4][1]],
            8: [reels[0][2], reels[1][2], reels[2][1], reels[3][0], reels[4][0]],
            9: [reels[0][0], reels[1][0], reels[2][1], reels[3][2], reels[4][2]],
            10: [reels[0][0], reels[1][1], reels[2][1], reels[3][1], reels[4][0]],
            11: [reels[0][2], reels[1][1], reels[2][1], reels[3][1], reels[4][2]],
        };
        // reset matches array every new spin
        this.matches.length = 0;
        const MINIMUM_MATCH_LENGTH = 3;
        let score = 0;
        for (const [patternNumber, reelPositions] of Object.entries(winLines)) {
            const [maxConsecutives, matchEmoji] = this.countConsecutiveRepeats(reelPositions);
            const matchesFromStartOrEnd = matchEmoji === reelPositions[0] || matchEmoji === reelPositions.at(-1);
            if (maxConsecutives >= MINIMUM_MATCH_LENGTH && matchesFromStartOrEnd) {
                const matchQuantity = `match${maxConsecutives}`;
                score += matchEmoji[matchQuantity];
                this.matches.push([Array(maxConsecutives).fill(matchEmoji), patternNumber]);
            }
        }
        return score;
    }
    /**
     * Reels contain multiple instances of the same object references,
     * so === will work for validating equality
     */
    countConsecutiveRepeats(line) {
        let maxConsecutiveCount = 1;
        let maxConsecutiveEmoji = line[0];
        let currentCount = 1;
        for (let i = 0; i < line.length - 1; i++) {
            if (line[i] === line[i + 1]) {
                currentCount++;
            }
            else {
                // store new maxConsecutive values if greater, then reset count
                if (currentCount > maxConsecutiveCount) {
                    maxConsecutiveCount = currentCount;
                    maxConsecutiveEmoji = line[i];
                }
                currentCount = 1;
            }
        }
        return [maxConsecutiveCount, maxConsecutiveEmoji];
    }
}
