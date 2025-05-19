import { Message } from '@ai-sdk/react';

import { cn } from '~/lib/utils';

import AssistantMessage from './assistant-message';
import UserMessage from './user-message';

interface MessagesProps {
  messages: Message[];
  className?: string;
}

const Messages = ({ messages, className }: MessagesProps) => {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {messages.map(({ id, content, role }) => (
        <article key={id}>
          {role === 'user' ? (
            <UserMessage content={content} />
          ) : (
            <AssistantMessage content={content} />
          )}
        </article>
      ))}
    </div>
  );
};

export default Messages;
