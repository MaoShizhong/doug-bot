import { SlashCommandBuilder } from 'discord.js';
import { showProfile } from '../../embeds/profile_embed';
const command = {
    data: new SlashCommandBuilder()
        .setName('showprofile')
        .setDescription('Display your profile (or provide a user ID to show a specific profile)')
        .addStringOption((option) => option.setName('id').setDescription('ID of user to show profile for (optional)')),
    async execute(interaction) {
        const interactionUser = interaction.member;
        const userID = interaction.options.getString('id') ?? interactionUser.id;
        const profileEmbed = await showProfile(userID, interaction.guildId);
        if (!profileEmbed) {
            await interaction.reply({ content: 'No user in this server found with that ID!' });
        }
        else {
            await interaction.reply({
                embeds: [profileEmbed],
            });
        }
    },
};
export default command;
