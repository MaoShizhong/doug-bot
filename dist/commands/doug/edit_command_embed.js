import { SlashCommandBuilder } from 'discord.js';
import { commandsEmbeds } from '../../embeds/commands_embeds.js';
const command = {
    data: new SlashCommandBuilder()
        .setName('setnewcommandsembed')
        .setDescription('For Mao to edit the changelog commands embed only'),
    async execute(interaction) {
        const interactionUser = interaction.member;
        if (interactionUser.id === process.env.MAO_ID) {
            const commandsPageOne = await interaction.channel?.messages.fetch('1128844687336292393');
            commandsPageOne?.edit({ embeds: [commandsEmbeds[1]] });
            const commandsPageTwo = await interaction.channel?.messages.fetch('1128872804775891045');
            commandsPageTwo?.edit({ embeds: [commandsEmbeds[2]] });
            await interaction.reply({ content: 'Commands embed updated!', ephemeral: true });
        }
        else {
            await interaction.reply({ content: "Nice try but you're not Mao!", ephemeral: true });
        }
    },
};
export default command;
