import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export class RegistrationForm extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      property: ''
    };
  }

  render(): any {
    return (
      <div className='flexCenter'>
        <form className='registrationForm'>
          <Form>
            <Form.Group controlId='formGroupFirstName'>
              <Form.Label>First Name</Form.Label>
              <Form.Control placeholder='Enter your first name' />
            </Form.Group>
            <Form.Group controlId='formGroupLastName'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control placeholder='Enter your last name' />
            </Form.Group>
            <Form.Group controlId='formGroupEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' placeholder='Enter your email' />
            </Form.Group>
            <Form.Group controlId='formGroupPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Enter your password' />
            </Form.Group>
            <Form.Group controlId='formGroupConfirmation'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter your password again'
              />
            </Form.Group>
          </Form>

          <div className='flexCenter'>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
