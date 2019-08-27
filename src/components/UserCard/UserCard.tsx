import React from 'react';
import { Button } from 'react-bootstrap';

import './UserCard.css';

export function UserCard(props: {
  fullName: string;
  photoUrl: string;
  id: string;
  email: string;
  position: string;
}) {
  let buttonDiv = null;

  if (props.position === 'headcoach') {
    buttonDiv = (
      <div className='button-div'>
        <Button variant='success' className='usercard-button-left'>
          Upgrade
        </Button>
        <Button variant='danger' className='usercard-button-right'>
          Downgrade
        </Button>
      </div>
    );
  } else {
    buttonDiv = null;
  }

  return (
    <section style={{ width: '15rem', height: '20rem' }} className='user-card'>
      <div className='user-photo'>
        <img alt='User Photo' src={props.photoUrl} />
      </div>
      <div className='user-info'>
        <div className='title'>{props.fullName}</div>
        {/* <div>{props.id}</div> */}
        <div className='description'>{props.email}</div>
        {buttonDiv}
      </div>
    </section>
  );
}
