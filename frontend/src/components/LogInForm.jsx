import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";

import useAuth from '../hooks/useAuth';
import { routes } from '../routes';

import { useTranslation } from 'react-i18next';

const FormSection = () => {
  const { t } = useTranslation();

  const [authFailed, setAuthFailed] = useState(false);
  const { logIn } = useAuth();
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
      logIn(res.data);
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
			<h1 className='mb-4 text-center'>{t('logIn.login')}</h1>
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
				<Form.Label htmlFor="username">{t('logIn.username')}</Form.Label>
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
				<Form.Label htmlFor="password">{t('logIn.password')}</Form.Label>
        <div className="invalid-tooltip">{t('logIn.error')}</div>
			</Form.Group>
			<Button type="submit" variant="outline-primary" className='w-100 mb-3 mt-2'>{t('logIn.login')}</Button>
		</Form>
	);
};
  
export default FormSection;