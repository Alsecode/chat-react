import { useSelector } from 'react-redux';

import useAuth from '../../hooks/useAuth.jsx';

import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import { selectors as messagesSelectors } from '../../slices/messagesSlice.js';

import ChatForm from './Form.jsx';
import Messages from './Messages.jsx';
import Header from './Header.jsx';

const Chat = () => {
  const channelId = useSelector((state) => state.currentChannel).id;
  const channelName = useSelector((state) => channelsSelectors.selectById(state, channelId))?.name;
  const messages = useSelector(messagesSelectors.selectAll)
    .filter((message) => message.channelId === channelId);
  const messagesCount = messages.length;

  const { user } = useAuth();

  return (
    <>
      <Header name={channelName} messagesCount={messagesCount} />
      <Messages items={messages} />
      <ChatForm channelId={channelId} username={user} />
    </>
  );
};

export default Chat;
