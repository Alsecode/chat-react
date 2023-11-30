import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { routes } from '../routes';
import NotFoundImage from '../img/no-results.png';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className='container h-100'>
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
          <img src={NotFoundImage} alt={t('extra.notFound')} className='w-25 animation-show'></img>
          <h2>{t('notFound.header')}</h2>
          <p>{t('notFound.offer.text')} <Link to={routes.mainPage()}>{t('notFound.offer.link')}</Link></p>  
      </div>
    </div>
  )
};
  
  export default NotFound;