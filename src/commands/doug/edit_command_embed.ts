import { SlashCommandBuilder } from 'discord.js';
import { commandsEmbeds } from '../../embeds/commands_embeds.js';

const MAO_ID = '120227869157883904';

export default {
    data: new SlashCommandBuilder()
        .setName('setnewcommandsembed')
        .setDescription('For Mao to edit the changelog commands embed only'),
    async execute(interaction) {
        if (interaction.member.id === MAO_ID) {
            const commandsPageOne = await interaction.channel.messages.fetch('1128844687336292393');
            commandsPageOne.edit({ embeds: [helpOne] });

            const commandsPageTwo = await interaction.channel.messages.fetch('1128872804775891045');
            commandsPageTwo.edit({ embeds: [helpTwo] });

            await interaction.reply({ content: 'Commands embed updated!', ephemeral: true });
        } else {
            await interaction.reply({ content: "Nice try but you're not Mao!", ephemeral: true });
        }
    },
};
