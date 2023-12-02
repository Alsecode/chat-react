const ru = {
  translation: {
    languages: {
      en: 'Eng',
      ru: 'Рус',
    },
    name: 'Hexlet Chat',
    logIn: {
      login: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      error: 'Неверные имя пользователя или пароль',
      question: 'Нет аккаунта?',
      offer: 'Регистрация',
    },
    signUp: {
      signup: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmation: 'Подтвердите пароль',
      button: 'Зарегистрироваться',
      errors: {
        username: {
          required: 'Обязательное поле',
          min3max20: 'От 3 до 20 символов',
          alreadyExist: 'Такой пользователь уже существует',
        },
        password: {
          required: 'Обязательное поле',
          min6: 'Не менее 6 символов',
        },
        confirmation: {
          match: 'Пароли должны совпадать',
        },
      },
    },
    notFound: {
      header: 'Страница не найдена :(',
      offer: {
        text: 'Но вы можете перейти на',
        link: 'главную страницу',
      },
    },
    main: {
      logOut: 'Выйти',
      channels: {
        header: 'Каналы',
        modals: {
          add: 'Добавить канал',
          rename: 'Переименовать канал',
          remove: 'Удалить канал',
          undoBtn: 'Отменить',
          sendBtn: 'Отправить',
          renameBtn: 'Переименовать',
          removeBtn: 'Удалить',
          question: 'Уверены?',
          errors: {
            min3max20: 'От 3 до 20 символов',
            required: 'Обязательное поле',
            unique: 'Должно быть уникальным',
          },
        },
      },
      chat: {
        counter: {
          count_one: '{{count}} сообщение',
          count_few: '{{count}} сообщения',
          count_many: '{{count}} сообщений',
        },
        input: 'Введите сообщение...',
      },
    },
    toasts: {
      added: 'Канал создан!',
      renamed: 'Канал переименован!',
      removed: 'Канал удалён!',
      error: 'Ошибка соединения :(',
    },
    extra: {
      auth: 'Авторизация',
      loading: 'Загрузка',
      notFound: 'Не найдено',
      signUp: 'Регистрация',
      text: 'Текст',
      name: 'Имя канала',
      managment: 'Управление каналом',
      addBtn: 'Добавить канал',
      logo: 'Лого',
      plus: '+',
    },
  },
};

export default ru;
