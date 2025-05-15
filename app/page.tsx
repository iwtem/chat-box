import Image from 'next/image';

import ChatInput from '~/components/chat/chat-input';

export default function Home() {
  return (
    <main className="flex h-full flex-col">
      <div className="relative m-auto flex w-full max-w-200 flex-col gap-6 p-6 md:p-12">
        <div className="mx-auto flex items-center gap-4">
          <Image
            className="dark:invert"
            src="/logo.svg"
            alt="AI Chat Box logo"
            width={64}
            height={64}
            priority
          />
          <h1 className="text-2xl font-medium">Hi, I&apos;m AI Chat Box.</h1>
        </div>

        <p className="mx-auto text-center text-gray-500">How can I help you today?</p>

        <ChatInput />
      </div>

      <div className="fixed bottom-0 w-full p-2 text-center text-xs text-gray-400">
        AI-generated, for reference only
      </div>
    </main>
  );
}
