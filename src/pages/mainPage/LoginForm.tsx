import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Form, Button, Modal } from 'react-bootstrap';
import CommunicationService from '../../utils/CommunicationService';

const schema = Yup.object().shape({
  email: Yup.string()
    .required('Required')
    .email('Not a proper email'),
  password: Yup.string().required('Required')
});

export const LoginForm = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitLogin = async (values: any) => {
    await CommunicationService.fetchFunc('POST', 'api/login', values);
  };

  return (
    <>
      <Button variant='success' onClick={handleShow}>
        Sign in
      </Button>

      <Modal>
        <Modal.Header />
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={submitLogin}
            initialValues={{
              email: '',
              password: ''
            }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
