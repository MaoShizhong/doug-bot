import { Message } from 'discord.js';

export function handleIncomingMessage(message: Message): void {
    if (message.author.bot) return;

    // TODO: handle messages

    // msg.content = msg.content.toLowerCase().trim();

    // const dougID = '1105901074025553990';

    // const userID = msg.author.id;
    // const account = User.users.find((user) => user.id === userID);
    // account.increaseTotalMessages();

    // if (msg.content.startsWith(`<@${dougID}>`)) {
    //     msg.reply('Did you mean to use `/douggpt` or `/continue`?');
    // }
    // // AI response - use Babbage
    // else if (/^<@&1105911690396176407>\s.+$/.test(msg.content)) {
    //     const message = msg.content.slice(23).trim();

    //     const res = await model.call(message);
    //     msg.reply(res);
    // } else if (msg.content.startsWith('!slots')) {
    //     msg.reply('Did you mean to try `/slots`?');
    // } else if (containsDoug(msg.content)) {
    //     msg.react('1105890013297791036');
    //     account.increaseDougMessages();
    // } else if (msg.content === 'hello there') {
    //     msg.channel.send('General Kenobi');
    // }
}
