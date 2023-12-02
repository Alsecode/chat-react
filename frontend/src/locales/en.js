const en = {
  translation: {
    languages: {
      en: 'Eng',
      ru: 'Рус',
    },
    name: 'Hexlet Chat',
    logIn: {
      login: 'Log in',
      username: 'Username',
      password: 'Password',
      error: 'Invalid username or password',
      question: 'No account?',
      offer: 'Sign up',
    },
    signUp: {
      signup: 'Sign up',
      username: 'Username',
      password: 'Password',
      confirmation: 'Confirm password',
      button: 'Sign up',
      errors: {
        username: {
          required: 'Required field',
          min3max20: '3 to 20 characters',
          alreadyExist: 'This user already exists',
        },
        password: {
          required: 'Required field',
          min6: 'At least 6 characters',
        },
        confirmation: {
          match: 'Passwords must match',
        },
      },
    },
    notFound: {
      header: 'Page not found :(',
      offer: {
        text: 'But you can go to',
        link: 'main page',
      },
    },
    main: {
      logOut: 'Log out',
      channels: {
        header: 'Channels',
        modals: {
          add: 'Add channel',
          rename: 'Rename channel',
          remove: 'Remove channel',
          undoBtn: 'Undo',
          sendBtn: 'Send',
          renameBtn: 'Rename',
          removeBtn: 'Remove',
          question: 'Are you sure?',
          errors: {
            min3max20: '3 to 20 characters',
            required: 'Required field',
            unique: 'Must be unique',
          },
        },
      },
      chat: {
        counter: {
          count_one: '{{count}} message',
          count_other: '{{count}} messages',
        },
        input: 'Type a message...',
      },
    },
    toasts: {
      added: 'Channel has been created!',
      renamed: 'Channel has been renamed!',
      removed: 'Channel has been removed!',
      error: 'Network Error :(',
    },
    extra: {
      auth: 'Authorization',
      loading: 'Loading',
      notFound: 'Not found',
      signUp: 'Registration',
      text: 'Text',
      name: 'Channel name',
      managment: 'Channel managment',
      addBtn: 'Add channel',
      logo: 'Logo',
    },
  },
};

export default en;
