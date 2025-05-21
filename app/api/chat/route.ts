import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { streamText } from 'ai';
// import { ollama } from 'ollama-ai-provider';

const lmstudio = createOpenAICompatible({ name: 'lmstudio', baseURL: 'http://localhost:1234/v1' });

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  //const model = ollama('qwen3:30b-a3b');
  const model = lmstudio('qwen3-1.7b');

  const response = streamText({ model, messages });

  return response.toDataStreamResponse();
}
