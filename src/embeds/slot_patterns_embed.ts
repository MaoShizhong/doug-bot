import { AttachmentBuilder, EmbedBuilder } from 'discord.js';

export const image = new AttachmentBuilder('../images/slotpatterns.png');
export const patterns = new EmbedBuilder()
    .setColor(0xa51c30)
    .setTitle('Slots match lines')
    .setImage('attachment://slotpatterns.png');
