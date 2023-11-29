import React, { useState, StrictMode } from 'react';

import { actions as channelsActions } from './slices/channelsSlice.js';
import { actions as messagesActions } from './slices/messagesSlice.js';

import LangContext from './contexts/lang';
import AuthContext from './contexts/auth';
import ApiContext from './contexts/api';



import { Provider } from 'react-redux';
import initStore from './slices/index';

import App from './App.jsx';

import { io } from 'socket.io-client';


import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
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

const sendSocket = (action, payload, socket) => {
  const response = socket.emit(action, payload);
};

const getApi = (socket) => ({
  newMessage: (message) => sendSocket('newMessage', message, socket),
  newChannel: (channel) => sendSocket('newChannel', channel, socket),
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
    dispatch(channelsActions.renameChannel({ id: payload.id, changes: payload }));
  });

  await i18next 
    .use(initReactI18next)
    .use(LanguageDetector)
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
          <ApiContext.Provider value={getApi(socket)}>
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