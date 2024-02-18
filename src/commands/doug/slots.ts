import { GuildMember, SlashCommandBuilder } from 'discord.js';
import { User } from '../../db/models/User';
import { SlotMachine } from '../../games/slots/SlotMachine';
import { SlashCommand } from '../../types.js';

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('slots')
        .setDescription('Try your luck at the slots!')
        .addIntegerOption((option) =>
            option
                .setName('bet')
                .setDescription('optional gold bet (min. 1 / max. 5000')
                .setMinValue(1)
                .setMaxValue(5000)
        ),
    async execute(interaction): Promise<void> {
        const interactionUser = interaction.member as GuildMember;
        const user = await User[interaction.guildId as string].findById(interactionUser.id).exec();
        const bet = interaction.options.getInteger('bet');

        if (!user) {
            await interaction.reply({ content: `Could not find user ID ${interactionUser.id}.` });
            return;
        }

        if (bet && (user.gold as number) < bet) {
            await interaction.reply(user.insufficientGoldMessage);
        } else {
            (user.gold as number) -= bet ?? 0;
            const slotMachine = new SlotMachine(user, bet);
            const resultsEmbed = slotMachine.getSlotsResults();

            await Promise.all([
                user.save(),
                interaction.reply({
                    embeds: [resultsEmbed],
                    allowedMentions: { repliedUser: false },
                }),
            ]);
        }
    },
};

export default command;
