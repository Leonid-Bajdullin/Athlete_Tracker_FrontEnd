import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { UserProfile } from './UserProfile';

export function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Registration Page
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: 'grey' }}>
          <UserProfile />
        </Modal.Body>
        <Modal.Footer style={{ padding: '0px' }}>
          <Button className='update-user' variant='primary'>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
