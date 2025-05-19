import DeepSeek from '../icons/deepseek';

interface AssistantMessageProps {
  content: string;
}

const AssistantMessage = ({ content }: AssistantMessageProps) => {
  return (
    <div className="flex items-start gap-4">
      <span className="-mt-0.5 rounded-full border bg-white p-0.5">
        <DeepSeek className="size-7" />
      </span>
      <div>{content}</div>
    </div>
  );
};

export default AssistantMessage;
