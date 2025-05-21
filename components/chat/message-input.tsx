'use client';

import { Atom, Globe, Paperclip, Send } from 'lucide-react';
import type { ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import { useRef, useState } from 'react';

import { Button } from '~/components/ui/button';
import { Tooltip } from '~/components/ui/tooltip';

import { cn } from '~/lib/utils';
import SwitchButton from './switch-button';

interface MessageInputProps {
  input: string;
  handleInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  className?: string;
}

const MessageInput = ({ input, handleInputChange, handleSubmit, className }: MessageInputProps) => {
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [thinkingEnabled, setThinkingEnabled] = useState(false);
  const isComposing = useRef(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // 避免 Safari 浏览器中，中文输入法可能会出发提交事件
    if (e.keyCode === 229) {
      return;
    }

    // 避免非 Enter 键触发提交事件
    if (e.key !== 'Enter') {
      return;
    }

    // 避免中文输入法可能会出发提交事件
    if (e.key === 'Enter' && (e.nativeEvent.isComposing || isComposing.current)) {
      return;
    }

    // 仅在按下 Enter 键且没有按下 Alt、Ctrl、Shift 键时，触发提交事件
    if (e.key === 'Enter' && !e.altKey && !e.ctrlKey && !e.shiftKey) {
      const button = document.querySelector<HTMLButtonElement>('button[type="submit"]');
      button?.click();
    }
  };

  return (
    <div
      className={cn(
        'flex w-full flex-col gap-2 rounded-3xl border border-gray-100 bg-gray-50 p-4',
        className,
      )}
    >
      <form onSubmit={handleSubmit}>
        <textarea
          rows={2}
          value={input}
          autoFocus
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => (isComposing.current = true)}
          onCompositionEnd={() => (isComposing.current = false)}
          placeholder="Ask me anything..."
          className="w-full resize-none placeholder:text-gray-300 focus:outline-none"
        />

        <div className="flex justify-between gap-4">
          <div className="flex gap-2">
            <Tooltip side="left" content="先思考后回答，解决推理问题">
              <SwitchButton icon={<Atom />} checked={thinkingEnabled} onChange={setThinkingEnabled}>
                深度思考
              </SwitchButton>
            </Tooltip>
            <Tooltip side="right" content="按需搜索网页">
              <SwitchButton icon={<Globe />} checked={searchEnabled} onChange={setSearchEnabled}>
                联网搜索
              </SwitchButton>
            </Tooltip>
          </div>
          <div className="flex gap-2">
            {searchEnabled ? (
              <Tooltip content="联网搜索不支持上传文件">
                <div
                  role="button"
                  className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-400"
                >
                  <Paperclip size={16} />
                </div>
              </Tooltip>
            ) : (
              <Tooltip
                content={
                  <div className="flex flex-col gap-2">
                    <span>上传附件（仅识别文字）</span>
                    <span className="text-gray-400">
                      最多 50 个，每个 100 MB，支持各类图片和文档
                    </span>
                  </div>
                }
              >
                <Button variant="outline" size="icon" className="rounded-full">
                  <Paperclip />
                </Button>
              </Tooltip>
            )}
            {input.trim() ? (
              <Button type="submit" variant="outline" size="icon" className="rounded-full">
                <Send />
              </Button>
            ) : (
              <Tooltip content="请输入你的问题">
                <div
                  role="button"
                  className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-400"
                >
                  <Send size={16} />
                </div>
              </Tooltip>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
