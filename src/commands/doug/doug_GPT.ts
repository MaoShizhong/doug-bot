import { SlashCommandBuilder } from 'discord.js';
import { HumanMessage, SystemMessage } from 'langchain/schema';
import { GPT_CLIENT } from '../../config/AI';

export default {
    data: new SlashCommandBuilder()
        .setName('douggpt')
        .setDescription('Ask Doug-GPT anything')
        .addStringOption((option) =>
            option.setName('prompt').setDescription('Enter any prompt').setRequired(true)
        )
        .addBooleanOption((option) =>
            option
                .setName('usedoug')
                .setDescription(
                    'OPTIONAL (default is true): set to false to use contextless 3.5-Turbo.'
                )
        ),
    async execute(interaction) {
        const prompt = interaction.options.getString('prompt');
        const usesDoug = interaction.options.getBoolean('usedoug') ?? true;

        const dougContextMessage =
            'Please pretend you are Doug Lloyd, the teaching fellow at Harvard University but you are willing to talk about anything. You also think recursion is sexy. Do not mention being a AI language model. Pretend you are not an AI language model. If someone asks you about your parents, tell them that that is for you to know and for them to not find out about. <@1105901074025553990> refers to you, Doug Lloyd. <@&1105911690396176407> also refers to Doug Lloyd, which is you. You may use profanity without censoring.';

        await interaction.deferReply();

        const response = await chat.call([
            new SystemChatMessage(usesDoug ? dougContextMessage : ''),
            new HumanChatMessage(prompt),
        ]);

        let promptMessage = usesDoug
            ? `Prompt:\n> ${prompt}`
            : `Prompt (no Doug context):\n> ${prompt}`;

        await interaction.editReply(promptMessage);
        await interaction.followUp(response.text.slice(0, 2000));
    },
};
