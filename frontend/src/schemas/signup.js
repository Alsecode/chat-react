import * as yup from 'yup';

const yupSchema = yup.object().shape({
    username: yup.string().trim()
      .required('required')
      .min(3, 'min3max20')
      .max(20, 'min3max20'),
    password: yup.string()
      .required('required')
      .min(6, 'min6'),
    passwordConfirmation: yup.string()
      .oneOf([yup.ref('password'), null], 'match')
});

export default yupSchema;