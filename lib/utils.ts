import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names
 * @param inputs - class names
 * @returns merged class names
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/**
 * Escape brackets
 * @param text - text
 * @returns escaped text
 */
export const escapeBrackets = (text: string) => {
  const pattern = /(```[\s\S]*?```|`.*?`)|\\\[([\s\S]*?[^\\])\\\]|\\\((.*?)\\\)/g;
  return text.replace(pattern, (match, codeBlock, squareBracket, roundBracket) => {
    if (codeBlock) {
      return codeBlock;
    }

    if (squareBracket) {
      return `$$${squareBracket}$$`;
    }

    if (roundBracket) {
      return `$${roundBracket}$`;
    }

    return match;
  });
};

/**
 * Try wrap html code
 * @param text - text
 * @returns wrapped text
 */
export const tryWrapHtmlCode = (text: string) => {
  // try add wrap html code (fixed: html codeblock include 2 newline)
  // ignore embed codeblock
  if (text.includes('```')) {
    return text;
  }

  return text
    .replace(
      /([`]*?)(\w*?)([\n\r]*?)(<!DOCTYPE html>)/g,
      (match, quoteStart, lang, newLine, doctype) => {
        return !quoteStart ? '\n```html\n' + doctype : match;
      },
    )
    .replace(
      /(<\/body>)([\r\n\s]*?)(<\/html>)([\n\r]*)([`]*)([\n\r]*?)/g,
      (match, bodyEnd, space, htmlEnd, newLine, quoteEnd) => {
        return !quoteEnd ? bodyEnd + space + htmlEnd + '\n```\n' : match;
      },
    );
};
