import { streamText } from 'ai';
import { ollama } from 'ollama-ai-provider';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const model = ollama('qwen3:30b-a3b');

  const response = streamText({ model, messages });

  return response.toDataStreamResponse();
}
