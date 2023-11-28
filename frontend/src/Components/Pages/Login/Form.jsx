import {Formik, Form, Field } from 'formik';
import "./LoginPage.scss";

const FormSection = () => {


  return (<Formik
    initialValues={{ nickname: "", password: "" }}
    onSubmit={({ setSubmitting }) => {
      console.log("Form is validated! Submitting the form...");
      setSubmitting(false);
    }}
  >
	{() => (
		<Form>
			<h1 className='mb-4'>Войти</h1>
			<div className="form-floating mb-3">
				<Field
					type="text"
					name="nickname"
					id="nickname"
					className="form-control"
					required
					
				/>
				<label htmlFor="nickname">Ваш ник2</label>
			</div>
			<div className="form-floating mb-3">
				<Field
					type="password"
					name="password"
					id="password"
					className="form-control"
					required
				/>
				<label htmlFor="password">Пароль</label>
			</div>
			<button type="submit" className="btn btn-outline-primary">Войти</button>
		</Form>
	)}
  </Formik>
)};
  
  export default FormSection;