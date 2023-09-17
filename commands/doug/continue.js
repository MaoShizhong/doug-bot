const { SlashCommandBuilder } = require('discord.js');
const { ChatOpenAI } = require('langchain/chat_models/openai');
const { SystemChatMessage } = require('langchain/schema');
const { openAIKey } = require('../../keys.json');

const chat = new ChatOpenAI({ openAIApiKey: openAIKey, temperature: 0.9 });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('continue')
        .setDescription('Continue a Doug-GPT message from a previous message ID')
        .addStringOption((option) =>
            option.setName('id').setDescription('ID of message to continue from').setRequired(true)
        )
        .addStringOption((option) =>
            option.setName('prompt').setDescription('Optional additional prompt')
        ),
    async execute(interaction) {
        const msgID = interaction.options.getString('id');
        const prompt = interaction.options.getString('prompt');

        const textToContinue = await interaction.channel.messages.fetch(msgID);

        let systemMsg = `Continue the following message: ${textToContinue}`;
        if (prompt) systemMsg += `\nPlease take into account the following prompt: ${prompt}`;

        const optionalPrompt = prompt ? `Additional prompt:\n> ${prompt}\n` : '';

        await interaction.deferReply();

        const response = await chat.call([new SystemChatMessage(systemMsg)]);

        await interaction.editReply(
            `Continuing from: https://discord.com/channels/${interaction.guild.id}/${
                interaction.channel.id
            }/${msgID}\n${optionalPrompt}\n${response.text.slice(
                0,
                1850 - (prompt ? prompt.length : 0)
            )}`
        );
    },
};
