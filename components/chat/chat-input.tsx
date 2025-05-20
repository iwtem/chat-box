'use client';

import { useChat } from '@ai-sdk/react';
import { Atom, Globe, Paperclip, Send } from 'lucide-react';
import { useState } from 'react';

import { Button } from '~/components/ui/button';
import { Tooltip } from '~/components/ui/tooltip';

import SwitchButton from './switch-button';

const ChatInput = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [thinkingEnabled, setThinkingEnabled] = useState(false);

  return (
    <div className="flex w-full flex-col gap-2 rounded-3xl border border-gray-100 bg-gray-50 p-4">
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === 'user' ? 'User: ' : 'AI: '}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case 'text':
                return <div key={`${message.id}-${i}`}>{part.text}</div>;
            }
          })}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <textarea
          rows={2}
          value={input}
          onChange={handleInputChange}
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

export default ChatInput;
