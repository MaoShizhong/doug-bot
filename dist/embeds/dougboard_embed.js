import { EmbedBuilder } from 'discord.js';
import { User } from '../db/models/User';
export async function getDougBoard(guildID) {
    const users = await User[guildID].find({}).select('name messages').exec();
    const sortedUsersByDougDesc = users.sort((userA, userB) => {
        const dougRatioA = userA.messages.dougged / (userA.messages.total ?? 0);
        const dougRatioB = userB.messages.dougged / (userB.messages.total ?? 0);
        return dougRatioB - dougRatioA;
    });
    let leaderboard = '```\n';
    for (let i = 0; i < sortedUsersByDougDesc.length; i++) {
        leaderboard += `${i + 1} - ${sortedUsersByDougDesc[i].douggedPercentage}\u2004-\u2004${sortedUsersByDougDesc[i].name}\n`;
    }
    leaderboard += '```';
    return new EmbedBuilder()
        .setTitle('The Doug Board')
        .setDescription("Who has been dougged the most?\n% of total messages (counting from 28th August '23 because I'm an idiot) that have been dougged")
        .addFields({ name: '\u200B', value: leaderboard });
}
