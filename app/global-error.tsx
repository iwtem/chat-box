'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '~/components/ui/button';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export const metadata: Metadata = { title: 'Error | Something went wrong!' };

const GlobalError = ({ error, reset }: GlobalErrorProps) => {
  return (
    <html>
      <body>
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-primary text-base font-semibold">Error</p>
            <h1 className="text-heading mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
              Something went wrong!
            </h1>
            <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              {`${error.name}: ${error.message}`}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild>
                <Link href="/">Go back home</Link>
              </Button>
              <Button variant="secondary" onClick={reset}>
                Try again
              </Button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
};

export default GlobalError;
