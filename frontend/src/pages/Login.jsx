import { Link } from 'react-router-dom';

import Form from '../components/LogInForm';
import { routes } from '../routes';
import LoginImage from "../img/login.png";

import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <div className="container-fluid h-100 bg-light">
        <div className='row justify-content-center align-items-center h-100'>
            <div className="col-12 col-md-8 col-xxl-6 animation-show">
                <div className="d-flex flex-column bg-white border shadow-sm">
                    <div className="row p-5">
                        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                            <img src={LoginImage} className='rounded animation-show' alt={t('extra.auth')} width="200px" />
                        </div>
                        <div className="col-12 col-md-6 mt-3">
                            <Form/>
                        </div>
                    </div>
                    <div className="text-center py-4 border border-top bg-login">
                        <span>{t('logIn.question')} </span>
                        <Link to={routes.signupPage()}>{t('logIn.offer')}</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default LoginPage;