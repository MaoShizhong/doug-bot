import { ChatOpenAI } from '@langchain/openai';

export const GPT_CLIENT = new ChatOpenAI({
    apiKey: process.env.OPENAI_KEY,
    maxTokens: 1900,
    model: "gpt-4o-mini",
    temperature: 0.5,
});
