'use client';

import { useChat } from '@ai-sdk/react';
import { Atom, Globe, Paperclip, Send } from 'lucide-react';

import { Button } from '~/components/ui/button';

const ChatInput = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex w-full flex-col gap-2 rounded-3xl border border-gray-100 bg-gray-50 p-4">
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === 'user' ? 'User: ' : 'AI: '}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case 'text':
                return <div key={`${message.id}-${i}`}>{part.text}</div>;
            }
          })}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <textarea
          rows={2}
          value={input}
          onChange={handleInputChange}
          placeholder="Ask me anything..."
          className="w-full resize-none placeholder:text-gray-300 focus:outline-none"
        />

        <div className="flex justify-between gap-4">
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-full">
              <Atom />
              <span className="hidden md:inline">深度思考</span>
            </Button>
            <Button variant="outline" className="rounded-full">
              <Globe />
              <span className="hidden md:inline">联网搜索</span>
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <Paperclip />
            </Button>
            <Button type="submit" variant="outline" size="icon" className="rounded-full">
              <Send />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
