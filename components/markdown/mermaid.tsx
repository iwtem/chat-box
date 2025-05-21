import mermaid from 'mermaid';
import { useEffect, useRef, useState } from 'react';

import { cn } from '~/lib/utils';

interface MermaidProps {
  code: string;
  className?: string;
}

const Mermaid = ({ code, className }: MermaidProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (code && ref.current) {
      mermaid.run({ nodes: [ref.current], suppressErrors: true }).catch((e) => {
        setHasError(true);
        console.error('[Mermaid] ', e.message);
      });
    }
  }, [code]);

  if (hasError) {
    return <div className="text-red-500">Mermaid render error</div>;
  }

  return (
    <div ref={ref} className={cn('mermaid cursor-pointer overflow-auto', className)}>
      {code}
    </div>
  );
};

export default Mermaid;
