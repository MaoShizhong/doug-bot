import { OpenAI } from 'langchain/llms/openai';
import { openAIKey } from '../keys.json' with { type: 'json' };

export default new OpenAI({
    openAIApiKey: openAIKey,
    temperature: 0.9,
});
