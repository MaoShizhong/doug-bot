const { EmbedBuilder } = require('discord.js');
const { gold } = require('../emojis/general_emojis.js');
const { User } = require('../users/User.js');

function showProfile(id) {
    const user = User.users.find((user) => user.id === id);

    const profile = new EmbedBuilder()
        .setColor(user.profileColor)
        .setTitle(`${user.name}`)
        .setThumbnail(`${user.avatar}`);

    if (user.hasGoldClaimAvailable) {
        profile.addFields({
            name: 'Gold',
            value:
                `${user.gold.toLocaleString('en-US')}${gold}\n` +
                `*You have a claim available! Enter \`/gold\` to claim ${User.goldClaimAmount}${gold}*`,
        });
    } else {
        const remainingTimeInMS = Date.now() - user.lastGoldClaim;
        const remainingTimeInMins = 60 - ~~(remainingTimeInMS / 60000);

        profile.addFields({
            name: 'Gold',
            value:
                `${user.gold.toLocaleString('en-US')}${gold}\n` +
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

exports.showProfile = showProfile;
