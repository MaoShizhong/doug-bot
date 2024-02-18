import { SlashCommandBuilder } from 'discord.js';
import { SystemMessage } from 'langchain/schema';
import { GPT_CLIENT } from '../../config/AI';
import { SlashCommand } from '../../types';

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('continue')
        .setDescription('Continue a Doug-GPT message from a previous message ID')
        .addStringOption((option) =>
            option.setName('id').setDescription('ID of message to continue from').setRequired(true)
        )
        .addStringOption((option) =>
            option.setName('prompt').setDescription('Optional additional prompt')
        ),
    async execute(interaction): Promise<void> {
        const msgID = interaction.options.getString('id')!;
        const prompt = interaction.options.getString('prompt');

        const textToContinue = await interaction.channel?.messages.fetch(msgID);

        let systemMsg = `Continue the following message: ${textToContinue}`;
        if (prompt) systemMsg += `\nPlease take into account the following prompt: ${prompt}`;

        const optionalPrompt = prompt ? `Additional prompt:\n> ${prompt}\n` : '';

        await interaction.deferReply();

        const response = await GPT_CLIENT.invoke([new SystemMessage(systemMsg)]);

        await interaction.editReply(
            `Continuing from: https://discord.com/channels/${interaction.guild?.id}/${
                interaction.channel?.id
            }/${msgID}\n${optionalPrompt}\n${response.content.slice(
                0,
                1850 - (prompt ? prompt.length : 0)
            )}`
        );
    },
};

export default command;