import * as yup from 'yup';

const yupSchema = (channels) => {
    return yup.object().shape({
        name: yup.string().trim()
          .min(3, 'min3max20')
          .max(20, 'min3max20')
          .required('required')
          .notOneOf(channels, 'unique')
    });
}

export default yupSchema;