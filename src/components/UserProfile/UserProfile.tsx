import React, { Component } from 'react';
import { Form, Col, Image, Button, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import _ from 'lodash';

import './UserProfile.css';
import { userProfileSchema } from '../../validation/validationSchemaYup';
import { inject, observer } from 'mobx-react';

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

  submitChanges = (values: any) => {
    let {
      firstName,
      lastName,
      email,
      password,
      nickname,
      phone,
      photoUrl,
      ...rest
    } = values;

    const newValues = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      nickname: nickname,
      photoUrl: photoUrl,
      phone: phone,
      data: {
        address: rest
      }
    };

    this.props.store.saveUserProfile(
      this.props.store.currentUser.id,
      newValues
    );

    this.handleClose();
  };

  render() {
    const user = this.props.store.currentUser;

    const initialValues = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: '',
      nickname: user.nickname,
      city: _.get(user, 'data.address.city', ''),
      street: _.get(user, 'data.address.street', ''),
      house: _.get(user, 'data.address.house', ''),
      apartment: _.get(user, 'data.address.apartment', ''),
      postalCode: _.get(user, 'data.address.postalCode', ''),
      phone: user.phone,
      photoUrl: user.photoUrl
    };

    return (
      <>
        <Button variant='info' onClick={this.handleShow}>
          Profile page
        </Button>

        <Modal size='xl' show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              validationSchema={userProfileSchema}
              onSubmit={this.submitChanges}
              initialValues={initialValues}
            >
              {({ handleSubmit, handleChange, values: userInputs, errors }) => (
                <Form
                  className='user-profile'
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <Form.Row>
                    <Col md={4}>
                      <Form.Group
                        className='image-container'
                        style={{ border: '2px solid #4e5de5' }}
                      >
                        <Image
                          className='profile-img'
                          src={this.props.store.currentUser.photoUrl}
                          // fluid
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Photo</Form.Label>
                        <Form.Control
                          name='photoUrl'
                          type='text'
                          placeholder='Enter photo URL'
                          value={userInputs.photoUrl}
                          onChange={handleChange}
                          isInvalid={!!errors.photoUrl}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors.photoUrl}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          name='password'
                          type='password'
                          placeholder='Enter your password, if you want to change it'
                          value={userInputs.password}
                          onChange={handleChange}
                          isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                          name='firstName'
                          type='text'
                          placeholder='Enter your first name'
                          value={userInputs.firstName}
                          onChange={handleChange}
                          isInvalid={!!errors.firstName}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors.firstName}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                          name='lastName'
                          type='text'
                          placeholder='Enter your last name'
                          value={userInputs.lastName}
                          onChange={handleChange}
                          isInvalid={!!errors.lastName}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors.lastName}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Nickname</Form.Label>
                        <Form.Control
                          name='nickname'
                          type='text'
                          placeholder='Enter your nickname'
                          value={userInputs.nickname}
                          onChange={handleChange}
                          isInvalid={!!errors.nickname}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors.nickname}
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
                          isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          name='phone'
                          type='text'
                          placeholder='Enter your phone'
                          value={userInputs.phone}
                          onChange={handleChange}
                          isInvalid={!!errors.phone}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          name='city'
                          type='text'
                          placeholder='Enter your city'
                          value={userInputs.city}
                          onChange={handleChange}
                          isInvalid={!!errors.city}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors.city}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Postal code</Form.Label>
                        <Form.Control
                          name='postalCode'
                          type='text'
                          placeholder='Enter your postal code'
                          value={userInputs.postalCode}
                          onChange={handleChange}
                          isInvalid={!!errors.postalCode}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors.postalCode}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Street</Form.Label>
                        <Form.Control
                          name='street'
                          type='text'
                          placeholder='Enter your street'
                          value={userInputs.street}
                          onChange={handleChange}
                          isInvalid={!!errors.street}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors.street}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>House</Form.Label>
                        <Form.Control
                          name='house'
                          type='text'
                          placeholder='Enter your house'
                          value={userInputs.house}
                          onChange={handleChange}
                          isInvalid={!!errors.house}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors.house}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Apartment</Form.Label>
                        <Form.Control
                          name='apartment'
                          type='text'
                          placeholder='Enter your apartment'
                          value={userInputs.apartment}
                          onChange={handleChange}
                          isInvalid={!!errors.apartment}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors.apartment}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Form.Row>
                  <Button variant='primary' type='submit'>
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
