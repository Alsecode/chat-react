import sendSocket from './sendSocket';

const getApi = (socket, dispatch) => ({
  newMessage: (message) => sendSocket('newMessage', message, socket),
  newChannel: (channel) => sendSocket('newChannel', channel, socket, dispatch),
  removeChannel: (id) => sendSocket('removeChannel', id, socket),
  renameChannel: ({ id, name }) => sendSocket('renameChannel', { id, name }, socket),
});

export default getApi;
