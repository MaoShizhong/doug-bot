import { AttachmentBuilder, EmbedBuilder } from 'discord.js';
import { join as pathJoin } from 'path';
import { getDirName } from '../util/dirname.js';

export const image = new AttachmentBuilder(
    pathJoin(getDirName(import.meta.url), '..', 'images/slotpatterns.png')
);
export const patterns = new EmbedBuilder()
    .setColor(0xa51c30)
    .setTitle('Slots match lines')
    .setImage('attachment://slotpatterns.png');
