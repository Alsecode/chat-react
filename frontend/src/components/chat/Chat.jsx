import { useSelector } from 'react-redux';

import useAuth from '../../hooks/useAuth.jsx';

import {selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import {selectors as messagesSelectors } from '../../slices/messagesSlice.js';

import ChatForm from './Form.jsx';
import Messages from './Messages.jsx';
import Header from './Header.jsx';

const Chat = () => {
  const currentChannelId = useSelector((state) => state.currentChannel).id;
  const currentChannelName  = useSelector((state) => channelsSelectors.selectById(state, currentChannelId))?.name;
  const messages = useSelector(messagesSelectors.selectAll).filter((message) => message.channelId === currentChannelId);
  const messagesCount = messages.length;

  const { user } = useAuth();

  return (
    <>
      <Header name={currentChannelName} messagesCount={messagesCount}/>
      <Messages items={messages}/>
      <ChatForm channelId={currentChannelId} username={user}/>
    </>
  );
};

export default Chat