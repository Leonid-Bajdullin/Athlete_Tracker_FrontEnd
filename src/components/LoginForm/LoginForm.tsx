import React, { Component } from 'react';
import { Formik } from 'formik';
import { Form, Button, Modal } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';

import { loginSchema } from '../../validation/validationSchemaYup';
import './LoginForm.css';

const initialValues = {
  email: '',
  password: ''
};

@inject('store')
@observer
export class LoginForm extends Component<{ store?: any }, { show: boolean }> {
  constructor(props: any) {
    super(props);

    this.state = {
      show: false
    };
  }

  handleClose = () => {
    this.setState({
      show: false
    });
  };

  handleShow = () => {
    this.setState({
      show: true
    });
  };

  submitLogin = (values: any) => {
    this.props.store.loginUser(values);
    this.handleClose();
  };

  render() {
    return (
      <>
        <Button variant="success" onClick={this.handleShow}>
          Sign in
        </Button>

        <Modal size="sm" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              validationSchema={loginSchema}
              onSubmit={this.submitLogin}
              initialValues={initialValues}
            >
              {({
                handleSubmit,
                handleChange,
                values: userInputs,
                touched,
                errors
              }) => (
                <Form className="login-form" noValidate onSubmit={handleSubmit}>
                  <Form.Group controlId="loginEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      name="email"
                      type="text"
                      placeholder="Enter your email"
                      value={userInputs.email}
                      onChange={handleChange}
                      isValid={touched.email && !errors.email}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value={userInputs.password}
                      onChange={handleChange}
                      isValid={touched.password && !errors.password}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <footer className="flex-center">
                    <Button variant="success" type="submit">
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
  }
}
