import { Message } from 'discord.js';
import { LLM_TRIGGER, generateLLMResponse } from '../AI/AI';
import { dougEmoji } from '../helpers/emojis/slots_emojis';
import { containsDoug } from './doug_react';

export async function handleIncomingMessage(message: Message): Promise<void> {
    if (message.author.bot) return;

    const messageContent = message.content.toLowerCase().trim();
    const { id: userID } = message.author;

    // TODO: Handle message/dougged message count in db
    // const account = User.users.find((user) => user.id === userID);
    // account.increaseTotalMessages();

    if (messageContent.startsWith(`<@${process.env.BOT_ID}>`)) {
        message.reply('Did you mean to use `/douggpt` or `/continue`?');
    } else if (messageContent.startsWith('!slots')) {
        message.reply('Did you mean to try `/slots`?');
    } else if (containsDoug(messageContent)) {
        message.react(dougEmoji);
        // account.increaseDougMessages();
    } else if (messageContent === 'hello there') {
        message.channel.send('General Kenobi');
    } else if (LLM_TRIGGER.test(messageContent)) {
        message.reply(await generateLLMResponse(messageContent));
    }
}
