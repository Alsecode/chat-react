import * as yup from 'yup';

const yupSchema = yup.object().shape({
    username: yup.string().trim()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов'),
    password: yup.string()
      .required('Обязательное поле')
      .min(6, 'Не менее 6 символов'),
    passwordConfirmation: yup.string()
      .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
});

export default yupSchema;