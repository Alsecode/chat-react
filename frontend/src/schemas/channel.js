import * as yup from 'yup';

const yupSchema = (channels) => {
    return yup.object().shape({
        name: yup.string().trim()
          .min(3, 'От 3 до 20 символов')
          .max(20, 'От 3 до 20 символов')
          .required('Обязательное поле')
          .notOneOf(channels, 'Должно быть уникальным')
    });
}

export default yupSchema;