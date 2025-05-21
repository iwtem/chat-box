import DeepSeek from '~/components/icons/deepseek';
import Markdown from '~/components/markdown/markdown';

interface AssistantMessageProps {
  content: string;
}

const AssistantMessage = ({ content }: AssistantMessageProps) => {
  return (
    <div className="flex items-start gap-4">
      <span className="-mt-0.5 rounded-full border bg-white p-0.5">
        <DeepSeek className="size-7" />
      </span>
      <Markdown className="min-w-0">{content}</Markdown>
    </div>
  );
};

export default AssistantMessage;
