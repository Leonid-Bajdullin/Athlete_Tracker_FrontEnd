import React from 'react';
import { Button } from 'react-bootstrap';

import './TeamCard.css';

export function TeamCard(props: {
  name: string;
  photoUrl: string;
  id: string;
  memberCount?: number;
}) {
  return (
    <section style={{ width: '15rem', height: '20rem' }} className='team-card'>
      <div className='team-photo'>
        <img alt='Team Photo' src={props.photoUrl} />
      </div>
      <div className='team-info'>
        <div className='title'>{props.name}</div>
        {/* <div>{props.id}</div> */}
        <div className='description'>{props.memberCount}</div>
        <Button className='button-div'>View</Button>
      </div>
    </section>
  );
}
