/* eslint-disable react/jsx-props-no-spreading */
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  useContext, useState, useEffect, useRef,
} from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import AuthContext from '../contexts/auth';
import routes from '../routes';
import schemas from '../schemas';
import showToast from '../helpers/showToast';

const generateErrorText = (err, field) => (err ? `signUp.errors.${field}.${err.message}` : null);

const FormSection = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemas.signUp),
    mode: 'onTouched',
  });
  const { ref, ...rest } = register('username');

  const onSubmit = async ({ username, password }) => {
    try {
      const res = await axios.post(routes.signupPath(), { username, password });
      auth.logIn(res.data);
      navigate(routes.mainPage());
    } catch (err) {
      if (err.isAxiosError && err?.response?.status === 409) {
        setAuthFailed(true);
        inputRef.current.select();
      } else {
        showToast('error', t('toasts.error'));
      }
    }
  };

  const usernameErrorText = generateErrorText(errors.username, 'username');
  const passwordErrorText = generateErrorText(errors.password, 'password');
  const confirmationErrorText = generateErrorText(errors.passwordConfirmation, 'confirmation');

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="mb-4 text-center">{t('signUp.signup')}</h1>
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
        <Form.Label htmlFor="username">{t('signUp.username')}</Form.Label>
        <div className="invalid-tooltip">{t(usernameErrorText) || t('signUp.errors.username.alreadyExist')}</div>
      </Form.Group>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          type="password"
          name="password"
          id="password"
          placeholder=""
          {...register('password')}
          isInvalid={errors.password}
        />
        <Form.Label htmlFor="password">{t('signUp.password')}</Form.Label>
        <div className="invalid-tooltip">{t(passwordErrorText)}</div>
      </Form.Group>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          type="password"
          name="passwordConfirmation"
          id="passwordConfirmation"
          placeholder=""
          {...register('passwordConfirmation')}
          isInvalid={errors.passwordConfirmation}
        />
        <Form.Label htmlFor="password">{t('signUp.confirmation')}</Form.Label>
        <div className="invalid-tooltip">{t(confirmationErrorText)}</div>
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3 mt-2">{t('signUp.button')}</Button>
    </Form>
  );
};

export default FormSection;
