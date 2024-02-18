import { EmbedBuilder } from 'discord.js';
import { GOLD_CLAIM_AMOUNT } from '../constants/constants.js';
import { gold } from '../constants/emojis/general_emojis.js';

export const commandsEmbeds = {
    1: new EmbedBuilder()
        .setColor(0xa51c30)
        .setAuthor({ name: 'Page: 1 / 2' })
        .setTitle('Commands')
        .addFields(
            { name: '/commands', value: 'Brings this embed up.' },
            {
                name: '/showprofile {userID: optional}',
                value: 'e.g. `/showprofile` or `/showprofile 120227869157883904`\nShows your profile, or the profile of a given user ID if valid.',
            },
            {
                name: '/profilecolor {hex: required}',
                value: "e.g. `/profilecolor FFFFFF` or `/profilecolor #83A9C0`\nChanges your profile's color strip (# is optional).",
            },
            {
                name: '/douggpt {prompt: required} {useDoug: optional}',
                value: 'e.g. `/douggpt What do you think about recursion?`\nBreaking academic honesty since 19-something.\nSet useDoug to false to use 3.5-Turbo with no Doug context (default value is true).',
            },
            {
                name: '/continue {messageID: required} {prompt: optional}',
                value: 'e.g. `/continue 1113159516016627866`\nor `/continue 1113159516016627866 "Do not mention recursion"`\nContinue a message sent by DougGPT.\n',
            },
            {
                name: '@Doug Lloyd {USE THE ROLE} {prompt: required}',
                value: 'Like /douggpt but using Babbage LLM instead of GPT 3.5-Turbo.',
            }
        )
        .setFooter({
            text: 'Page: 1 / 2\u2004\u2004\u2004Navigation reacts are active for 45s from posting',
        }),
    2: new EmbedBuilder()
        .setColor(0xa51c30)
        .setAuthor({ name: 'Page: 2 / 2' })
        .setTitle('Commands')
        .addFields(
            {
                name: '/recursion',
                value: '```js\nconst rec = () => !willClickLink() || rec();\n```',
            },
            { name: '/dougboard', value: 'Who has been dougged the most?' },
            { name: '/gold', value: `Claim ${GOLD_CLAIM_AMOUNT}${gold} - 60 minute cooldown.` },
            {
                name: '/slots {bet: optional}',
                value: `e.g. \`/slots\` or \`/slots 100\`\nPlay slots or place a bet with ${gold} (min: 1 - max: 5000${gold} bet) and try your luck. Maybe you'll win big!`,
            },
            { name: '/slotpatterns', value: 'Shows the 11 match lines for slots.' },
            {
                name: '/poker {bet: required}',
                value: `e.g. \`/poker 1000\`\nMin: 1 - Max: 5000${gold} bet\nSolo five card draw!`,
            }
        )
        .setFooter({
            text: 'Page: 2 / 2\u2004\u2004\u2004Navigation reacts are active for 45s from posting',
        }),
};

export type CommandsEmbedPage = keyof typeof commandsEmbeds;

export function getCommandsEmbedPage(pageNumber: CommandsEmbedPage): EmbedBuilder {
    return commandsEmbeds[pageNumber];
}
