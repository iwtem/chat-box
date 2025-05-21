import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '~/components/ui/button';
import { copyToClipboard } from '~/lib/clipboard';

import Mermaid from './mermaid';

const PreCode = ({ children }: { children?: React.ReactNode }) => {
  const [mermaidCode, setMermaidCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (preRef.current) {
      const codeElements = preRef.current.querySelectorAll('code');
      const wrapLanguages = ['', 'md', 'markdown', 'text', 'txt', 'plaintext', 'tex', 'latex'];

      codeElements.forEach((codeElement) => {
        const languageClass = codeElement.className.match(/language-(\w+)/);
        const name = languageClass ? languageClass[1] : '';
        if (wrapLanguages.includes(name)) {
          codeElement.style.whiteSpace = 'pre-wrap';
        }
      });

      const mermaidDom = preRef.current.querySelector('code.language-mermaid');
      if (mermaidDom) {
        setMermaidCode((mermaidDom as HTMLElement).innerText);
      }
    }
  }, []);

  const handleCopyCode = () => {
    if (preRef.current) {
      const code = preRef.current.querySelector('code')?.innerText ?? '';
      Promise.resolve(copyToClipboard(code))
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch(() => {
          toast.error('Failed to copy code');
        });
    }
  };

  return (
    <>
      <pre ref={preRef} className="relative">
        <Button
          size="icon"
          onClick={isCopied ? undefined : handleCopyCode}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-300"
        >
          {isCopied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
        </Button>
        {children}
      </pre>
      {mermaidCode.length > 0 && <Mermaid code={mermaidCode} />}
    </>
  );
};

export default PreCode;
