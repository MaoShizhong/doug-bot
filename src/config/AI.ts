import { ChatOpenAI } from 'langchain/chat_models/openai';

export const GPT_CLIENT = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_KEY,
    temperature: 0.9,
});
