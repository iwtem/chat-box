import { useMemo } from 'react';
import RehypeHighlight from 'rehype-highlight';
import RehypeKatex from 'rehype-katex';
import RemarkBreaks from 'remark-breaks';
import RemarkGfm from 'remark-gfm';
import RemarkMath from 'remark-math';

import 'katex/dist/katex.min.css';
import '~/styles/highlight.css';
import '~/styles/markdown.css';

import { cn, escapeBrackets, tryWrapHtmlCode } from '~/lib/utils';

import MemoizedMarkdown from './memoized-markdown';

interface MarkdownProps {
  children: string;
  className?: string;
}

const Markdown = ({ className, children }: MarkdownProps) => {
  const escapedContent = useMemo(() => tryWrapHtmlCode(escapeBrackets(children)), [children]);

  return (
    <div dir="auto" className={cn('markdown-body', className)}>
      <MemoizedMarkdown
        remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
        rehypePlugins={[RehypeKatex, [RehypeHighlight, { detect: false, ignoreMissing: true }]]}
      >
        {escapedContent}
      </MemoizedMarkdown>
    </div>
  );
};

export default Markdown;
