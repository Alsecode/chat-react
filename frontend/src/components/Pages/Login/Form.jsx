import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";

import AuthContext from '../../../contexts';
import { routes } from '../../../routes';

const FormSection = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { register, handleSubmit } = useForm();
  const { ref, ...rest } = register('username');

  const onSubmit = async (values) => {
    setAuthFailed(false);
    try {
      const res = await axios.post(routes.loginPath(), values);
      localStorage.setItem('userId', JSON.stringify(res.data));
      auth.logIn();
      navigate(routes.mainPage());
    } catch (err) {
      if (err.isAxiosError && err.response.status === 401) {
        setAuthFailed(true);
        inputRef.current.select();
        return;
      }
      throw err;
    }
  }

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<h1 className='mb-4 text-center'>Войти</h1>
			<Form.Group className="form-floating mb-3">
        <Form.Control
					type="text"
					name="username"
					id="username"
					placeholder=""
          {...rest}
					required
          isInvalid={authFailed}
          ref={(e) => {
            ref(e);
            inputRef.current = e;
          }}
        />
				<Form.Label htmlFor="username">Ваш ник</Form.Label>
			</Form.Group>
			<Form.Group className="form-floating mb-3">
          <Form.Control
					type="password"
					name="password"
					id="password"
					placeholder=""
          {...register("password")}
					required
					isInvalid={authFailed}
          />
				<Form.Label htmlFor="password">Пароль</Form.Label>
        <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>
			</Form.Group>
			<Button type="submit" variant="outline-primary" className='w-100 mb-3 mt-2'>Войти</Button>
		</Form>
	);
};
  
export default FormSection;