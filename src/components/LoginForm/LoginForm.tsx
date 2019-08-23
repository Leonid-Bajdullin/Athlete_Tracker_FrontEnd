import React, { useState } from 'react';
import { Formik } from 'formik';
import { Form, Button, Modal } from 'react-bootstrap';

import { loginSchema } from '../../validation/validationSchemaYup';
// import BaseService from '../../services/BaseService';

const initialValues = {
  email: '',
  password: ''
};

export const LoginForm = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const submitLogin = async (values: any) => {
  //   await BaseService.fetchFunc('POST', 'api/login', values);
  // };

  return (
    <>
      <Button variant='success' onClick={handleShow}>
        Sign in
      </Button>

      <Modal size='sm' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={loginSchema}
            onSubmit={handleClose}
            initialValues={initialValues}
          >
            {({
              handleSubmit,
              handleChange,
              values: userInputs,
              touched,
              errors
            }) => (
              <Form className='login-form' noValidate onSubmit={handleSubmit}>
                <Form.Group controlId='loginEmail'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name='email'
                    type='text'
                    placeholder='Enter your email'
                    value={userInputs.email}
                    onChange={handleChange}
                    isValid={touched.email && !errors.email}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='loginPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name='password'
                    type='password'
                    placeholder='Enter your password'
                    value={userInputs.password}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <footer className='flex-center'>
                  <Button variant='success' type='submit'>
                    Sign in
                  </Button>
                </footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};
