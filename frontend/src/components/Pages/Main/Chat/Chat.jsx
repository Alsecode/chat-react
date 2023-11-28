import '../Main.scss';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChatForm from './Form.jsx';
import Messages from './Messages';
import Header from './Header';

import {selectors as channelsSelectors } from '../../../../slices/channelsSlice.js';
import {selectors as messagesSelectors } from '../../../../slices/messagesSlice.js';

import { actions as messagesActions }from '../../../../slices/messagesSlice.js';

import AuthContext from '../../../../contexts/index.jsx';

import '../Main.scss';

const Chat = ({ socket }) => {
  const currentChannelId = useSelector((state) => state.currentChannel).id;
  const currentChannelName  = useSelector((state) => channelsSelectors.selectById(state, currentChannelId)).name;
  const messages = useSelector(messagesSelectors.selectAll).filter((message) => message.channelId === currentChannelId);
  const messagesCount = messages.length;

  const context = useContext(AuthContext);
  const username = JSON.parse(context.loggedIn).username;

  const dispatch = useDispatch();

  socket.on('newMessage', (payload) => {
    dispatch(messagesActions.addMessage(payload));
  });

  return (
    <>
      <Header name={currentChannelName} messagesCount={messagesCount}/>
      <Messages items={messages}/>
      <ChatForm channelId={currentChannelId} username={username} socket={socket}/>
    </>
  );
};

export default Chat;