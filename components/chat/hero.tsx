import Image from 'next/image';

import { cn } from '~/lib/utils';

interface HeroProps {
  className?: string;
}

const Hero = ({ className }: HeroProps) => (
  <div className={cn('flex flex-col gap-6', className)}>
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
  </div>
);
export default Hero;
