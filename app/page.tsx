'use client';

import { Message, useChat } from '@ai-sdk/react';
import { useSearchParams } from 'next/navigation';

import Hero from '~/components/chat/hero';
import MessageInput from '~/components/chat/message-input';
import Messages from '~/components/chat/messages';
import mockMessages from '~/mock/messages.json';

export default function Home() {
  const searchParams = useSearchParams();
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: searchParams.get('mock') ? (mockMessages as unknown as Message[]) : [],
  });
  const hasMessages = messages.length > 0;

  return (
    <main className="mx-auto h-full w-full max-w-200 px-4 md:px-12">
      {hasMessages ? (
        <div className="flex h-full flex-col">
          <Messages messages={messages} className="flex-1" />
          <div className="sticky bottom-0 w-full flex-none bg-white">
            <MessageInput
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              className="shadow-md"
            />
            <div className="py-2 text-center text-xs text-gray-400">内容由 AI 生成，请仔细甄别</div>
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col justify-center gap-6">
          <Hero />
          <MessageInput
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
    </main>
  );
}
