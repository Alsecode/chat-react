import Form from '../components/SignUpForm';
import SignupImage from "../img/signup.png";

const SignupPage = () => (
    <div className="container-fluid h-100 bg-light">
        <div className='row justify-content-center align-items-center h-100'>
            <div className="col-12 col-md-8 col-xxl-6 animation-show">
                <div className="d-flex flex-column bg-white border shadow-sm">
                    <div className="row p-5">
                        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                            <img src={SignupImage} className='rounded animation-show' alt="Авторизация" width="200px"/>
                        </div>
                        <div className="col-12 col-md-6 mt-3">
                            <Form/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default SignupPage;