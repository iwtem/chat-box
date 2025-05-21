/**
 * Copy text via execCommand
 * @param text - text
 */
export const copyTextViaExecCommand = (text: string | null) => {
  // execCommand doesn't allow copying empty strings, so if we're
  // clearing clipboard using this API, we must copy at least an empty char
  if (!text) {
    text = ' ';
  }

  const isRTL = document.documentElement.getAttribute('dir') === 'rtl';

  const textarea = document.createElement('textarea');
  textarea.style.border = '0';
  textarea.style.padding = '0';
  textarea.style.margin = '0';
  textarea.style.position = 'absolute';
  textarea.style[isRTL ? 'right' : 'left'] = '-9999px';

  const yPosition = window.pageYOffset || document.documentElement.scrollTop;
  textarea.style.top = `${yPosition}px`;
  // Prevent zooming on iOS
  textarea.style.fontSize = '12pt';

  textarea.setAttribute('readonly', '');
  textarea.value = text;

  document.body.appendChild(textarea);

  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);
  const success = document.execCommand('copy');
  textarea.remove();

  return success;
};

/**
 * Copy to clipboard
 * @param text - text
 */
export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error(error);
  }

  return copyTextViaExecCommand(text);
};
