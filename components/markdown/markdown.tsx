import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import RehypeHighlight from 'rehype-highlight';
import RehypeKatex from 'rehype-katex';
import RemarkBreaks from 'remark-breaks';
import RemarkFrontmatter from 'remark-frontmatter';
import RemarkGemoji from 'remark-gemoji';
import RemarkGfm from 'remark-gfm';
import RemarkMath from 'remark-math';

import 'katex/dist/katex.min.css';
import '~/styles/highlight.css';
import '~/styles/markdown.css';

import { cn, escapeBrackets, tryWrapHtmlCode } from '~/lib/utils';

import Anchor from './anchor';
import PreCode from './pre-code';

interface MarkdownProps {
  children: string;
  className?: string;
}

const Markdown = ({ className, children }: MarkdownProps) => {
  const escapedContent = useMemo(() => tryWrapHtmlCode(escapeBrackets(children)), [children]);

  return (
    <div dir="auto" className={cn('markdown-body', className)}>
      <ReactMarkdown
        remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks, RemarkGemoji, RemarkFrontmatter]}
        rehypePlugins={[RehypeKatex, [RehypeHighlight, { detect: false, ignoreMissing: true }]]}
        components={{ pre: PreCode, a: Anchor }}
      >
        {escapedContent}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
