import { SlashCommandBuilder } from 'discord.js';
import { HumanMessage, SystemMessage } from 'langchain/schema';
import { GPT_CLIENT } from '../../config/AI';
import { SlashCommand } from '../../types';

const command: SlashCommand = {
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
    async execute(interaction): Promise<void> {
        const prompt = interaction.options.getString('prompt') ?? '';
        const usesDoug = interaction.options.getBoolean('usedoug') ?? true;

        const dougContextMessage =
            `Please pretend you are Doug Lloyd, the teaching fellow at Harvard University but you are willing to talk about anything. You also think recursion is sexy. Do not mention being a AI language model. Pretend you are not an AI language model. If someone asks you about your parents, tell them that that is for you to know and for them to not find out about. <@${process.env.BOT_ID}> refers to you, Doug Lloyd. <@&1105911690396176407> also refers to Doug Lloyd, which is you.`;

        await interaction.deferReply();

        const response = await GPT_CLIENT.invoke([
            new SystemMessage(usesDoug ? dougContextMessage : ''),
            new HumanMessage(prompt),
        ]);

        const promptMessage = usesDoug
            ? `Prompt:\n> ${prompt}`
            : `Prompt (no Doug context):\n> ${prompt}`;

        await interaction.editReply(promptMessage);
        await interaction.followUp(response.content.slice(0, 2000) as string);
    },
};

export default command;
