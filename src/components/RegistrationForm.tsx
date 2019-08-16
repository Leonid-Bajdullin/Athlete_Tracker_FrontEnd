import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import HelperFunctions from '../utils/HelperFunctions';

const schema = Yup.object().shape({
  firstName: Yup.string()
    .required('Required field')
    .max(20, 'No more than 20 letters'),
  lastName: Yup.string()
    .required('Required field')
    .max(20, 'No more than 20 letters'),
  email: Yup.string()
    .required('Required field')
    .email('Not a proper email'),
  password: Yup.string()
    .required('Required field')
    .min(6, 'Password must be at least 6 symbols long'),
  passwordConfirmation: Yup.string()
    .required('Required field')
    .oneOf([Yup.ref('password')], 'Passwords must match')
});

const submitRegistration = async (values: any) => {
  await HelperFunctions.fetchFunc('POST', values, 'api/users');
};

export function RegistrationForm() {
  return (
    <Formik
      validationSchema={schema}
      // onSubmit={(values) => {
      //   console.log(values);
      // }}
      onSubmit={submitRegistration}
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors
      }) => (
        <div className='flexCenter'>
          <div className='registrationForm'>
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId='formGroupfirst_name'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name='firstName'
                  type='text'
                  placeholder='Enter your first name'
                  value={values.firstName}
                  onChange={handleChange}
                  isValid={touched.firstName && !errors.firstName}
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId='formGroupLastName'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name='lastName'
                  type='text'
                  placeholder='Enter your last name'
                  value={values.lastName}
                  onChange={handleChange}
                  isValid={touched.lastName && !errors.lastName}
                  isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId='formGroupEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name='email'
                  type='email'
                  placeholder='Enter your email'
                  value={values.email}
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId='formGroupPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name='password'
                  type='password'
                  placeholder='Enter your password'
                  value={values.password}
                  onChange={handleChange}
                  isValid={touched.password && !errors.password}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId='formGroupConfirmation'>
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  name='passwordConfirmation'
                  type='password'
                  placeholder='Enter your password again'
                  value={values.passwordConfirmation}
                  onChange={handleChange}
                  isValid={
                    touched.passwordConfirmation && !errors.passwordConfirmation
                  }
                  isInvalid={!!errors.passwordConfirmation}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.passwordConfirmation}
                </Form.Control.Feedback>
              </Form.Group>

              <div className='flexCenter'>
                <Button variant='primary' type='submit'>
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}
