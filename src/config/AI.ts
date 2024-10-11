import { ChatOpenAI } from 'langchain/chat_models/openai';

const AI_OPTIONS = {
    openAIApiKey: process.env.OPENAI_KEY,
    temperature: 0.9,
};

// GPT 3.5-Turbo - exported for use in /douggpt slash command file
export const GPT_CLIENT = new ChatOpenAI(AI_OPTIONS);
