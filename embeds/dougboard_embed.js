const { EmbedBuilder } = require('discord.js');
const { User } = require('../users/User.js');

function getDougBoard() {
    const sortedUsersByDougDesc = [...User.users].sort(
        (userA, userB) => parseFloat(userB.douggedPercentage) - parseFloat(userA.douggedPercentage)
    );

    let leaderboard = '```\n';

    for (let i = 0; i < sortedUsersByDougDesc.length; i++) {
        leaderboard += `${i + 1} - ${sortedUsersByDougDesc[i].douggedPercentage}\u2004-\u2004${
            sortedUsersByDougDesc[i].name
        }\n`;
    }
    leaderboard += '```';

    const dougBoard = new EmbedBuilder()
        .setTitle('The Doug Board')
        .setDescription(
            "Who has been dougged the most?\n% of total messages (counting from 6th July '23) that have been dougged"
        )
        .addFields({ name: '\u200B', value: leaderboard });

    return dougBoard;
}

exports.getDougBoard = getDougBoard;
