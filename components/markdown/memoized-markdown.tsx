import { type FC, memo } from 'react';
import Markdown, { type Options } from 'react-markdown';

const MemoizedMarkdown: FC<Options> = memo(
  Markdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children,
);

export default MemoizedMarkdown;
