import { GuildMember, SlashCommandBuilder } from 'discord.js';
import { User } from '../../db/models/User';
import { SlashCommand } from '../../types';

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('profilecolor')
        .setDescription('Set profile colour')
        .addStringOption((option) =>
            option
                .setName('hex')
                .setDescription('6-digit hex code (# optional)')
                .setMinLength(6)
                .setMaxLength(7)
                .setRequired(true)
        ),
    async execute(interaction): Promise<void> {
        const option = interaction.options.getString('hex')!;
        const hex = option.includes('#') ? option.slice(1) : option;
        const isHexCode = /^[A-F\d]{6}$/i.test(hex);

        if (!isHexCode) {
            await interaction.reply(`${option} is not a valid hex code! Please try again.`);
            return;
        }

        const color = parseInt(hex, 16);
        const interactionUser = interaction.member as GuildMember;
        const user = await User[interaction.guildId as string].findById(interactionUser.id);

        if (!user) {
            await interaction.reply({
                content: `Could not find user ID ${interactionUser.id}.`,
            });
        } else if (user.profileColor === color) {
            await interaction.reply({
                content: `Your profile already uses that color!`,
                allowedMentions: { repliedUser: false },
            });
        } else {
            user.profileColor = color;
            await interaction.reply({
                content: `Your profile color has been changed to #${hex}.`,
                allowedMentions: { repliedUser: false },
            });
        }
    },
};

export default command;
