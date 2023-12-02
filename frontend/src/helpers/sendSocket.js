/* eslint-disable functional/no-let */
import { actions as currentChannelActions } from '../slices/currentChannelSlice';

const sendSocket = async (action, item, socket, dispatch) => (
  new Promise((resolve, reject) => {
    let requestSent = false;
    let connectionError = false;
    const itemToSend = { ...item };

    // Обработка ошибки подключения
    socket.on('connect_error', (err) => {
      connectionError = true;
      reject(new Error(`Connection Error: ${err.message || 'Unknown error'}`));
    });

    // Отправка события на сервер
    const sendRequest = () => {
      if (!requestSent && !connectionError) {
        requestSent = true;

        socket.emit(action, itemToSend, (response) => {
          if (response.status === 'ok') {
            resolve(response);
            requestSent = false;
          } else {
            reject(new Error('Response Error'));
            requestSent = false;
          }

          // Перемещение пользователя в только что созданный канал
          if (action === 'newChannel') {
            dispatch(currentChannelActions.updateCurrentChannel(response.data.id));
          }
        });
      }
    };

    // Вызов sendRequest сразу, если соединение установлено
    if (socket.connected) {
      sendRequest();
    }

    // Обработка события 'connect' - вызывается после восстановления соединения
    const connectHandler = () => {
      requestSent = false;
      // Отправка отложенного запрос, если он есть
      sendRequest();
      // Удаление обработчика, чтобы избежать повторных вызовов при будущих событиях 'connect'
      socket.off('connect', connectHandler);
    };

    // Устаноивка обработчика события 'connect' для обработки восстановления соединения
    socket.on('connect', connectHandler);
  })
);

export default sendSocket;
