import React, { Component } from 'react';
import { Form, Col, Image, Button, Modal } from 'react-bootstrap';
import { Formik } from 'formik';

import './UserProfile.css';
import ironman from '../../photos/ironman.jpg';
import { userProfileSchema } from '../../validation/validationSchemaYup';
import { inject, observer } from 'mobx-react';
// import { BaseService } from '../../services/BaseService';

@inject('store')
@observer
export class UserProfile extends Component<{ store?: any }, { show: boolean }> {
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

  render() {
    const initialValues = {
      firstName: this.props.store.currentUser.firstName,
      lastName: this.props.store.currentUser.lastName,
      email: this.props.store.currentUser.email,
      password: this.props.store.currentUser.password,
      nickname: this.props.store.currentUser.nickname,
      data: {},
      city: this.props.store.currentUser.city,
      street: this.props.store.currentUser.street,
      house: this.props.store.currentUser.house,
      apartment: this.props.store.currentUser.apartment,
      postalCode: this.props.store.currentUser.postalCode,
      phone: this.props.store.currentUser.phone,
      photoUrl: this.props.store.currentUser.photoUrl
    };
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          User profile
        </Button>

        <Modal size="xl" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              validationSchema={userProfileSchema}
              onSubmit={this.handleClose}
              initialValues={initialValues}
            >
              {({ handleSubmit, handleChange, values: userInputs, errors }) => (
                <Form
                  className="user-profile"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <Form.Row>
                    <Col md={4}>
                      <Form.Group style={{ border: '2px solid #4e5de5' }}>
                        <Image src={ironman} fluid />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Photo</Form.Label>
                        <Form.Control
                          name="photoUrl"
                          type="text"
                          placeholder="Enter photo URL"
                          value={userInputs.photoUrl}
                          onChange={handleChange}
                          isInvalid={!!errors.photoUrl}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.photoUrl}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                          name="firstName"
                          type="text"
                          placeholder="Enter your first name"
                          value={userInputs.firstName}
                          onChange={handleChange}
                          isInvalid={!!errors.firstName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.firstName}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                          name="lastName"
                          type="text"
                          placeholder="Enter your last name"
                          value={userInputs.lastName}
                          onChange={handleChange}
                          isInvalid={!!errors.lastName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.lastName}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Nickname</Form.Label>
                        <Form.Control
                          name="nickname"
                          type="text"
                          placeholder="Enter your nickname"
                          value={userInputs.nickname}
                          onChange={handleChange}
                          isInvalid={!!errors.nickname}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.nickname}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={userInputs.email}
                          onChange={handleChange}
                          isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          name="password"
                          type="password"
                          placeholder="Enter your password"
                          value={userInputs.password}
                          onChange={handleChange}
                          isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          name="city"
                          type="text"
                          placeholder="Enter your city"
                          value={userInputs.city}
                          onChange={handleChange}
                          isInvalid={!!errors.city}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.city}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label />
                        <Form.Control
                          name="postalCode"
                          type="text"
                          placeholder="Enter your postal code"
                          value={userInputs.postalCode}
                          onChange={handleChange}
                          isInvalid={!!errors.postalCode}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.postalCode}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label />
                        <Form.Control
                          name="street"
                          type="text"
                          placeholder="Enter your street"
                          value={userInputs.street}
                          onChange={handleChange}
                          isInvalid={!!errors.street}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.street}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label />
                        <Form.Control
                          name="house"
                          type="text"
                          placeholder="Enter your house"
                          value={userInputs.house}
                          onChange={handleChange}
                          isInvalid={!!errors.house}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.house}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label />
                        <Form.Control
                          name="apartment"
                          type="text"
                          placeholder="Enter your apartment"
                          value={userInputs.apartment}
                          onChange={handleChange}
                          isInvalid={!!errors.apartment}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.apartment}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          name="phone"
                          type="text"
                          placeholder="Enter your phone"
                          value={userInputs.phone}
                          onChange={handleChange}
                          isInvalid={!!errors.phone}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Form.Row>
                  <Button variant="primary" type="submit">
                    Save changes
                  </Button>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
