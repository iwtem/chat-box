'use client';

import { useChat } from '@ai-sdk/react';

import Hero from '~/components/chat/hero';
import MessageInput from '~/components/chat/message-input';
import Messages from '~/components/chat/messages';
import { cn } from '~/lib/utils';

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <main className="flex h-full flex-col">
      <div
        className={cn(
          'mx-auto flex h-full w-full max-w-200 flex-col items-center gap-6 p-4 md:p-12',
          messages.length > 0 ? 'justify-between' : 'justify-center',
        )}
      >
        {messages.length > 0 ? <Messages messages={messages} /> : <Hero />}

        <MessageInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />

        <div className="fixed bottom-0 w-full p-2 text-center text-xs text-gray-400">
          AI-generated, for reference only
        </div>
      </div>
    </main>
  );
}
