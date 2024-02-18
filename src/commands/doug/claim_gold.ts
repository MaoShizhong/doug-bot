import { GuildMember, SlashCommandBuilder } from 'discord.js';
import { GOLD_CLAIM_AMOUNT, GOLD_CLAIM_COOLDOWN_MS } from '../../constants/constants';
import { gold } from '../../constants/emojis/general_emojis';
import { User } from '../../db/models/User';
import { SlashCommand } from '../../types';

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('gold')
        .setDescription(`Claim ${GOLD_CLAIM_AMOUNT} free gold - cooldown: 60 minutes`),
    async execute(interaction): Promise<void> {
        const interactionUser = interaction.member as GuildMember;
        const UserInServer = User[interaction.guildId as string];
        const user = await UserInServer.findById(interactionUser.id).exec();

        if (!user) {
            console.error(`Invalid user ID ${interactionUser.id} - not found in DB`);
            return;
        }

        if (user.canClaimGold) {
            user.gold = Number(user.gold) + GOLD_CLAIM_AMOUNT;
            user.lastGoldClaim = Date.now();

            await Promise.all([
                user.save(),
                interaction.reply({
                    content:
                        `+${GOLD_CLAIM_AMOUNT}${gold}! ` +
                        `You currently have ${user.goldString}${gold}\n` +
                        `You may claim ${GOLD_CLAIM_AMOUNT}${gold}for free up to once every hour. Your next claim will be available in ${Math.round(
                            GOLD_CLAIM_COOLDOWN_MS / 60000
                        )} minutes.`,
                    allowedMentions: { repliedUser: false },
                }),
            ]);
        } else {
            const remainingTimeInMS = Date.now() - Number(user.lastGoldClaim);
            const remainingTimeInMins = 60 - Math.floor(remainingTimeInMS / 60000);

            await interaction.reply({
                content: `Sorry, you have already claimed ${gold} within the last hour! You may claim again in ${remainingTimeInMins} ${
                    remainingTimeInMins === 1 ? 'minute' : 'minutes'
                }.`,
                allowedMentions: { repliedUser: false },
            });
        }
    },
};

export default command;
