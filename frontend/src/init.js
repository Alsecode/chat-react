import React, { useState, StrictMode } from 'react';
import { Provider } from 'react-redux';
import initStore from './slices/index';
import { io } from 'socket.io-client';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { actions as channelsActions } from './slices/channelsSlice.js';
import { actions as messagesActions } from './slices/messagesSlice.js';
import { actions as currentChannelActions } from './slices/currentChannelSlice.js';

import LangContext from './contexts/lang';
import AuthContext from './contexts/auth';
import ApiContext from './contexts/api';
import App from './App.jsx';
import resources from './locales/index.js';

const AuthProvider = ({ children }) => {
  const currentUser = localStorage.user;
  const parsedUserData = currentUser !== undefined ? JSON.parse(currentUser).username : undefined;
  const [user, setUser] = useState(parsedUserData);

  const logIn = ({ token, username }) => {
    localStorage.setItem('user', JSON.stringify({ token, username }));
    setUser(username);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(undefined);
  };

  const getAuthHeader = () => {
    const { token } = JSON.parse(localStorage.user);
    if (token) return { Authorization: `Bearer ${token}` };
    return {};
  };

  return (
    <AuthContext.Provider value={{ logIn, logOut, user, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  );
};

const sendSocket = async (action, item, socket, dispatch) => (
  new Promise((resolve, reject) => {
    let requestSent = false;
    let connectionError = false;
    let itemToSend = { ...item };

    // Обработчик ошибки подключения
    socket.on('connect_error', (err) => {
      connectionError = true;
      reject(new Error(`Connection Error: ${err.message || 'Unknown error'}`));
    });

    // Отправляем событие на сервер
    const sendRequest = () => {
      if (!requestSent && !connectionError) {
        requestSent = true;

        socket.emit(action, itemToSend, (response) => {
          // Обработка успешного ответа
          if (response.status === 'ok') {

            // Дополнительные действия, если action === 'newChannel'

            resolve(response);
            console.log('так я СЕЙЧАС тут');

            requestSent = false;  // Сброс флага отправки запроса для разрешения новых запросов
          } else {
            reject(new Error('Response Error'));

            requestSent = false;  // Сброс флага отправки запроса, так как запрос не был успешно обработан
          }

          if (action === 'newChannel') {
            console.log('так я тут');
            dispatch(currentChannelActions.updateCurrentChannel(response.data.id));
          }
        })
      }
    };

    // Вызываем sendRequest сразу, если соединение уже установлено
    if (socket.connected) {
      sendRequest();
    }

    // Обработчик события 'connect' - вызывается после восстановления соединения
    const connectHandler = () => {
      // Сразу после восстановления соединения разрешаем отправку новых запросов
      requestSent = false;

      // Отправляем отложенный запрос, если есть
      sendRequest();
      // Удаляем обработчик, чтобы избежать повторных вызовов при будущих событиях 'connect'
      socket.off('connect', connectHandler);
    };

    // Устанавливаем обработчик события 'connect' для обработки восстановления соединения
    socket.on('connect', connectHandler);
  })
);



const getApi = (socket, dispatch) => ({
  newMessage: (message) => sendSocket('newMessage', message, socket),
  newChannel: (channel) => sendSocket('newChannel', channel, socket, dispatch),
  removeChannel: (id) => sendSocket('removeChannel', id, socket),
  renameChannel: ({ id, name }) => sendSocket('renameChannel', { id, name }, socket),
});

const LangProvider = ({ children }) => {
  const storedLanguage = localStorage.getItem('language');
  const [language, setLanguage] = useState(storedLanguage || i18next.language);

  const changeLanguage = (lng) => {
    i18next.changeLanguage(lng);
    setLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <LangContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LangContext.Provider>
  );
};

const init = async () => {
  const socket = io().connect();
  const store = initStore();
  const { dispatch } = store;

  socket.on('newMessage', (payload) => {
    dispatch(messagesActions.addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    dispatch(channelsActions.addChannel(payload));
  });

  socket.on('removeChannel', ({ id }) => {
    dispatch(channelsActions.removeChannel(id));
  });

  socket.on('renameChannel', (payload) => {
    dispatch(channelsActions.renameChannel({ id: payload.id, name: payload.name }));
  });

  await i18next 
    .use(initReactI18next)
    .init({
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

  return (
    <StrictMode>
      <LangProvider>
        <AuthProvider>
          <ApiContext.Provider value={getApi(socket, dispatch)}>
            <Provider store={store}>
              <App/>
            </Provider>
          </ApiContext.Provider>
        </AuthProvider>
      </LangProvider>
    </StrictMode>
  )
};

export default init;