import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useAuth from '../hooks/useAuth';
import useLang from '../hooks/useLang';
import Logo from "../img/logo.png";

const Header = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLang();
  const {logOut, user} = useAuth();

  const getClass = (lang) => {
    return lang === language ? "btn btn-primary" : "btn btn-outline-primary";
  }

  const logOutBtn = <button type="button" className="btn btn-primary" onClick={logOut}>{t('main.logOut')}</button>;

  return (
    <nav className="navbar navbar-light bg-white shadow-sm">
      <div className="container justify-content-between">
        <Link className='navbar-brand' to="/">
          <img src={Logo} width="30px" height="22px" alt={t('extra.logo')} className=' mb-1 pe-2'></img>
          {t('name')}</Link>
        <div className='d-flex gap-3'>
          <div className="btn-group" role="group">
            <button 
              type="button"
              className={getClass('en')}
              id='en'
              onClick={() => changeLanguage('en')}
            >{t(`languages.en`)}
            </button>
            <button
              type="button"
              className={getClass('ru')}
              id='ru'
              onClick={() => changeLanguage('ru')}
            >{t(`languages.ru`)}
            </button>
          </div>
          {user ? logOutBtn : null}
        </div>
      </div>
    </nav>
  );
};

export default Header;