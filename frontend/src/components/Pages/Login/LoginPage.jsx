import { Link } from 'react-router-dom';

import Form from './Form';
import { routes } from '../../../routes';
import './Login.scss';
import LoginPic from "../../../img/login.png";

const LoginPage = () => (
    <div className="container-fluid h-100 bg-light">
        <div className='row justify-content-center align-items-center h-100'>
            <div className="col-12 col-md-8 col-xxl-6 animation-show">
                <div className="d-flex flex-column bg-white border shadow-sm">
                    <div className="row p-5">
                        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                            <img src={LoginPic} className='rounded animation-show' alt="Авторизация" width="200px" />
                        </div>
                        <div className="col-12 col-md-6 mt-3">
                            <Form/>
                        </div>
                    </div>
                    <div className="text-center py-4 border border-top bg-login">
                        <span>Нет аккаунта? </span>
                        <Link to={routes.signupPage()}>Регистрация</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default LoginPage;