import { Check, ChevronsDownUp, ChevronsUpDown, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { copyToClipboard } from '~/lib/clipboard';
import { cn } from '~/lib/utils';
import Mermaid from './mermaid';

const PreCode = ({ children }: { children?: React.ReactNode }) => {
  const [mermaidCode, setMermaidCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [showToggle, setShowToggle] = useState(false);
  const [language, setLanguage] = useState('plaintext');

  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (preRef.current) {
      const codeHeight = preRef.current.scrollHeight;
      setShowToggle(codeHeight > 400);
      preRef.current.scrollTop = preRef.current.scrollHeight;
    }
  }, [children]);

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
        setLanguage(name);
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

  if (mermaidCode.length > 0) {
    return <Mermaid code={mermaidCode} />;
  }

  return (
    <pre ref={preRef} className={cn('relative', collapsed && 'max-h-100')}>
      <div className="sticky top-0 flex items-center justify-between bg-[#1a1b26] py-3 text-gray-500">
        <span className="text-sm">{language}</span>
        <div className="flex items-center gap-3">
          {showToggle && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="transition-colors hover:text-gray-300"
            >
              {collapsed ? <ChevronsUpDown size={16} /> : <ChevronsDownUp size={16} />}
            </button>
          )}
          <button
            onClick={isCopied ? undefined : handleCopyCode}
            className="transition-colors hover:text-gray-300"
          >
            {isCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          </button>
        </div>
      </div>
      {children}
    </pre>
  );
};

export default PreCode;
