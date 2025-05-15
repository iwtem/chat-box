import { Atom, Globe, Paperclip, Send } from 'lucide-react';
import Image from 'next/image';

import { Button } from '~/components/ui/button';

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

        <div className="flex w-full flex-col gap-2 rounded-3xl border border-gray-100 bg-gray-50 p-4">
          <textarea
            rows={2}
            placeholder="Ask me anything..."
            className="resize-none placeholder:text-gray-300 focus:outline-none"
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
              <Button variant="outline" size="icon" className="rounded-full">
                <Send />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 w-full p-2 text-center text-xs text-gray-400">
        AI-generated, for reference only
      </div>
    </main>
  );
}
