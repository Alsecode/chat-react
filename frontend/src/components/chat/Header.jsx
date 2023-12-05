import { useTranslation } from 'react-i18next';

const ChatHeader = ({ name, messagesCount }) => {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column p-3 bg-darker small shadow-sm mb-4">
      <b className="text-break">
        <span className="me-1">#</span>
        {name}
      </b>
      <p className="text-muted mb-0">{t('main.chat.counter.count', { count: messagesCount })}</p>
    </div>
  );
};

export default ChatHeader;
