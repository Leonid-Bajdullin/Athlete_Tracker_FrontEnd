import React from 'react';
import { Button } from 'react-bootstrap';

import './TeamCard.css';

export function TeamCard(props: {
  name: string;
  photoUrl: string;
  id: string;
  memberCount: number;
}) {
  return (
    <section style={{ width: '15rem', height: '20rem' }} className='team-card'>
      <div style={{ height: '60%' }}>
        <img alt='Team Photo' src={props.photoUrl} />
      </div>
      <div className='team-info'>
        <div className='title'>{props.name}</div>
        <div>{props.id}</div>
        <div>Member count: {props.memberCount}</div>
        <div className=' flex-center'>
          <Button>View</Button>
        </div>
      </div>
    </section>
  );
}
