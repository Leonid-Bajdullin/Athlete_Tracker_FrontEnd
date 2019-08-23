import React, { useState } from 'react';
import { Form, Col, Image, Button, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import { observer } from 'mobx-react';

import './UserProfile.css';
import ironman from '../../photos/ironman.jpg';
import { userProfileSchema } from '../../validation/validationSchemaYup';
import BaseService from '../../services/BaseService';

const initialValues = {
  firstName: 'Leo',
  lastName: 'Peo',
  email: 'lbajdull@gmail.com',
  password: 'free2play',
  nickname: '',
  data: {},
  city: '',
  street: '',
  house: '',
  apartment: '',
  postalCode: '',
  phone: '',
  photoUrl: ''
};

export const UserProfile = observer((props: any) => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(props.store.currentUser);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitProfileChanges = async (values: any) => {
    await BaseService.fetchFunc('PUT', 'api/login', values);
  };

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        User profile
      </Button>

      <Modal size='xl' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {user}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={userProfileSchema}
            onSubmit={submitProfileChanges}
            initialValues={initialValues}
          >
            {({ handleSubmit, handleChange, values: userInputs, errors }) => (
              <Form className='user-profile' noValidate onSubmit={handleSubmit}>
                <Form.Row>
                  <Col md={4}>
                    <Form.Group style={{ border: '2px solid #4e5de5' }}>
                      <Image src={ironman} fluid />
                    </Form.Group>
                    <Form.Group as={Col}>
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
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        name='password'
                        type='password'
                        placeholder='Enter your password'
                        value={userInputs.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.password}
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
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        size='sm'
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
                      <Form.Label />
                      <Form.Control
                        size='sm'
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
                      <Form.Label />
                      <Form.Control
                        size='sm'
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
                      <Form.Label />
                      <Form.Control
                        size='sm'
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
                      <Form.Label />
                      <Form.Control
                        size='sm'
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
});
