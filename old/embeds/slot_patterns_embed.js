const { AttachmentBuilder, EmbedBuilder } = require('discord.js');

const image = new AttachmentBuilder('./images/slotpatterns.png');
const patterns = new EmbedBuilder()
    .setColor(0xa51c30)
    .setTitle('Slots match lines')
    .setImage('attachment://slotpatterns.png');

exports.patterns = patterns;
exports.image = image;
