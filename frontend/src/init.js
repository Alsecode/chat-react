import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import { actions as channelsActions } from './slices/channelsSlice.js';
import { actions as messagesActions } from './slices/messagesSlice.js';

import AuthProvider from './providers/auth.jsx';
import LangProvider from './providers/lang.jsx';
import ApiContext from './contexts/api';
import initStore from './slices/index';
import App from './App.jsx';
import resources from './locales/index.js';
import getApi from './helpers/getApi.js';

const rollbarConfig = {
  accessToken: process.env.POST_CLIENT_ITEM_ACCESS_TOKEN,
  environment: 'production',
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
      fallbackLng: localStorage.getItem('language') || 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  return (
    <RollbarProvider value={rollbarConfig}>
      <ErrorBoundary>
        <StrictMode>
          <LangProvider>
            <AuthProvider>
              <ApiContext.Provider value={getApi(socket, dispatch)}>
                <Provider store={store}>
                  <App />
                </Provider>
              </ApiContext.Provider>
            </AuthProvider>
          </LangProvider>
        </StrictMode>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
