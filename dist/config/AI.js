import { ChatOpenAI } from 'langchain/chat_models/openai';
import { OpenAI } from 'langchain/llms/openai';
// Must
const DOUG_ROLE = '<@&1105911690396176407>';
export const LLM_TRIGGER = new RegExp(`/^${DOUG_ROLE}\\s.+$`);
const AI_OPTIONS = {
    openAIApiKey: process.env.OPENAI_KEY,
    temperature: 0.9,
};
// Babbage
const LLM = new OpenAI(AI_OPTIONS);
export async function generateLLMResponse(message) {
    // +1 accounts for trailing space between role and message
    const startOfMessageContents = DOUG_ROLE.length + 1;
    message = message.slice(startOfMessageContents).trim();
    return await LLM.invoke(message);
}
// GPT 3.5-Turbo - exported for use in /douggpt slash command file
export const GPT_CLIENT = new ChatOpenAI(AI_OPTIONS);
