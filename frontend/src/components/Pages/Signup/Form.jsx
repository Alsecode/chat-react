import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import AuthContext from '../../../contexts';
import { routes } from '../../../routes';
import schemas from '../../../schemas';

const FormSection = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemas.signUp),
    mode: 'onTouched'
  });
  const { ref, ...rest } = register('username');

  const onSubmit = async ({username, password}) => {
    try {
      const res = await axios.post(routes.signupPath(), {username, password});
      localStorage.setItem('userId', JSON.stringify(res.data));
      auth.logIn();
      navigate(routes.mainPage());
    } catch (err) {
      if (err.isAxiosError && err.response.status === 409) {
        setAuthFailed(true);
        inputRef.current.select();
        return;
      }
      throw err;
    }
  }

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<h1 className='mb-4 text-center'>Регистрация</h1>
			<Form.Group className="form-floating mb-3">
        <Form.Control
					type="text"
					name="username"
					id="username"
					placeholder=""
          {...rest}
          isInvalid={errors.username || authFailed}
          ref={(e) => {
            ref(e);
            inputRef.current = e;
          }}
        />
				<Form.Label htmlFor="username">Имя пользователя</Form.Label>
        <div className="invalid-tooltip">{errors.username?.message || 'Такой пользователь уже существует'}</div>
			</Form.Group>
			<Form.Group className="form-floating mb-3">
          <Form.Control
					type="password"
					name="password"
					id="password"
					placeholder=""
          {...register("password")}
					isInvalid={errors.password}
          />
				<Form.Label htmlFor="password">Пароль</Form.Label>
        <div className="invalid-tooltip">{errors.password?.message}</div>
			</Form.Group>
      <Form.Group className="form-floating mb-3">
          <Form.Control
					type="password"
					name="passwordConfirmation"
					id="passwordConfirmation"
					placeholder=""
          {...register("passwordConfirmation")}
					isInvalid={errors.passwordConfirmation}
          />
				<Form.Label htmlFor="password">Подтвердите пароль</Form.Label>
        <div className="invalid-tooltip">{errors.passwordConfirmation?.message}</div>
			</Form.Group>
			<Button type="submit" variant="outline-primary" className='w-100 mb-3 mt-2'>Зарегистрироваться</Button>
		</Form>
	);
};
  
export default FormSection;