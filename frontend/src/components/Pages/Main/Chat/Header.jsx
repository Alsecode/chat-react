const ChatHeader = ({ name, messagesCount }) => {
  return (
    <div className="d-flex flex-column p-3 bg-light small shadow-sm mb-4">
      <b># {name}</b>
      <p className="text-muted mb-0">{messagesCount} сообщений</p>
    </div>
  );
};

export default ChatHeader;