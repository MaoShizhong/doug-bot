import { Message } from 'discord.js';
import { dougEmoji } from '../constants/emojis/slots_emojis.js';
import { User } from '../db/models/User.js';
import { containsDoug } from './doug_react.js';

export async function handleIncomingMessage(message: Message): Promise<void> {
    if (message.author.bot) return;

    const messageContent = message.content.toLowerCase().trim();
    const { id: userID } = message.author;

    // increase total message count by 1 every message
    incrementMessageCount(userID, message.guildId as string, 'total');

    if (messageContent.startsWith(`<@${process.env.BOT_ID}>`)) {
        message.reply('Did you mean to use `/douggpt` or `/continue`?');
    } else if (messageContent.startsWith('!slots')) {
        message.reply('Did you mean to try `/slots`?');
    } else if (containsDoug(messageContent)) {
        message.react(dougEmoji);
        incrementMessageCount(userID, message.guildId as string, 'dougged');
    } else if (messageContent === 'hello there') {
        message.reply('General Kenobi');
    }
}

async function incrementMessageCount(
    userID: string,
    guildID: string,
    messageProperty: 'total' | 'dougged'
): Promise<void> {
    await User[guildID].findByIdAndUpdate(userID, {
        $inc: { [`messages.${messageProperty}`]: 1 },
    });
}
