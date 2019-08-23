import React, { useState } from 'react';
import { Formik } from 'formik';
import { Form, Button, Modal } from 'react-bootstrap';

import { registrationSchema } from '../../validation/validationSchemaYup';
import BaseService from '../../services/BaseService';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirmation: ''
};

export const RegistrationForm = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitRegistration = async (values: any) => {
    await BaseService.fetchFunc('POST', 'api/users', values);
  };

  return (
    <>
      <Button variant='success' onClick={handleShow}>
        Sign up
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registration Page</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={registrationSchema}
            onSubmit={submitRegistration}
            initialValues={initialValues}
          >
            {({
              handleSubmit,
              handleChange,
              values: userInputs,
              touched,
              errors
            }) => (
              <Form
                className='registration-form'
                noValidate
                onSubmit={handleSubmit}
              >
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    name='firstName'
                    type='text'
                    placeholder='Enter your first name'
                    value={userInputs.firstName}
                    onChange={handleChange}
                    isValid={touched.firstName && !errors.firstName}
                    isInvalid={!!errors.firstName}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    name='lastName'
                    type='text'
                    placeholder='Enter your last name'
                    value={userInputs.lastName}
                    onChange={handleChange}
                    isValid={touched.lastName && !errors.lastName}
                    isInvalid={!!errors.lastName}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name='email'
                    type='email'
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
                <Form.Group>
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
                <Form.Group>
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    name='passwordConfirmation'
                    type='password'
                    placeholder='Enter your password again'
                    value={userInputs.passwordConfirmation}
                    onChange={handleChange}
                    isValid={
                      touched.passwordConfirmation &&
                      !errors.passwordConfirmation
                    }
                    isInvalid={!!errors.passwordConfirmation}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.passwordConfirmation}
                  </Form.Control.Feedback>
                </Form.Group>
                <footer className='flex-center'>
                  <Button variant='success' type='submit'>
                    Sign up
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
