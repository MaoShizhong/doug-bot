import { EmbedBuilder } from 'discord.js';
import { User } from '../db/models/User';

export async function getDougBoard(guildID: string): Promise<EmbedBuilder> {
    const sortedUsersByDougDesc = await User[guildID]
        .find({})
        .select('name douggedPercentage')
        .sort({ douggedPercentage: -1 })
        .exec();

    let leaderboard = '```\n';

    for (let i = 0; i < sortedUsersByDougDesc.length; i++) {
        leaderboard += `${i + 1} - ${sortedUsersByDougDesc[i].douggedPercentage}\u2004-\u2004${
            sortedUsersByDougDesc[i].name
        }\n`;
    }
    leaderboard += '```';

    return new EmbedBuilder()
        .setTitle('The Doug Board')
        .setDescription(
            "Who has been dougged the most?\n% of total messages (counting from 28th August '23 because I'm an idiot) that have been dougged"
        )
        .addFields({ name: '\u200B', value: leaderboard });
}
