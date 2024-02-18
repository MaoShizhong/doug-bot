import { EmbedBuilder } from 'discord.js';
import { GOLD_CLAIM_AMOUNT } from '../constants/constants';
import { gold } from '../constants/emojis/general_emojis';
import { User } from '../db/models/User';

export async function showProfile(
    userID: string,
    guildID: string
): Promise<EmbedBuilder | undefined> {
    const user = await User[guildID].findById(userID).exec();

    if (!user) {
        console.error(`Unable to find profile for userID ${userID} in guildID ${guildID}`);
        return;
    }

    const profile = new EmbedBuilder()
        .setColor(user.profileColor)
        .setTitle(`${user.name}`)
        .setThumbnail(`${user.avatar}`);

    if (user.canClaimGold) {
        profile.addFields({
            name: 'Gold',
            value:
                `${user.goldString}${gold}\n` +
                `*You have a claim available! Enter \`/gold\` to claim ${GOLD_CLAIM_AMOUNT}${gold}*`,
        });
    } else {
        const remainingTimeInMS = Date.now() - Number(user.lastGoldClaim);
        const remainingTimeInMins = 60 - Math.floor(remainingTimeInMS / 60000);

        profile.addFields({
            name: 'Gold',
            value:
                `${user.goldString}${gold}\n` +
                `*Next available gold claim in ${remainingTimeInMins} ${
                    remainingTimeInMins === 1 ? 'minute' : 'minutes'
                }.*`,
        });
    }

    profile.addFields({
        name: 'Doug %',
        value: `${user.douggedPercentage} of your messages have been dougged.`,
    });

    return profile;
}
