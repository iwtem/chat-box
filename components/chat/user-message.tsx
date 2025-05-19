interface UserMessageProps {
  content: string;
}

const UserMessage = ({ content }: UserMessageProps) => {
  return (
    <div className="flex justify-end">
      <div className="rounded-xl bg-blue-50 px-5 py-2">{content}</div>
    </div>
  );
};

export default UserMessage;
