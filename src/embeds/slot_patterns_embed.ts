import { AttachmentBuilder, EmbedBuilder } from 'discord.js';
import { join as pathJoin } from 'path';

export const image = new AttachmentBuilder(pathJoin(process.cwd(), 'assets/slotpatterns.png'));
export const patterns = new EmbedBuilder()
    .setColor(0xa51c30)
    .setTitle('Slots match lines')
    .setImage('attachment://slotpatterns.png');
