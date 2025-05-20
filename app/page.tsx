'use client';

import { useChat } from '@ai-sdk/react';

import Hero from '~/components/chat/hero';
import MessageInput from '~/components/chat/message-input';
import Messages from '~/components/chat/messages';
import { cn } from '~/lib/utils';

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const hasMessages = messages.length > 0;

  return (
    <main className="flex h-full">
      <div className="mx-auto flex w-full max-w-200 flex-col justify-center gap-6 px-4 md:px-12">
        {hasMessages ? <Messages messages={messages} className="flex-1" /> : <Hero />}

        <div className="sticky bottom-0 w-full flex-none bg-white">
          <MessageInput
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            className={cn(hasMessages ? 'shadow-md' : '')}
          />
          {hasMessages && (
            <div className="py-2 text-center text-xs text-gray-400">
              AI-generated, for reference only
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
