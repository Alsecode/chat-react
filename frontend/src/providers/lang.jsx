import { useState } from 'react';
import i18next from 'i18next';

import LangContext from '../contexts/lang';

const LangProvider = ({ children }) => {
  const storedLanguage = localStorage.getItem('language');
  const [language, setLanguage] = useState(storedLanguage || i18next.language);

  const changeLanguage = (lng) => {
    i18next.changeLanguage(lng);
    setLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <LangContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LangContext.Provider>
  );
};

export default LangProvider;
