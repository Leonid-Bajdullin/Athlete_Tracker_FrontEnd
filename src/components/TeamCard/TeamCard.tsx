import React from 'react';
import { Button } from 'react-bootstrap';

import './TeamCard.css';
import { Link } from 'react-router-dom';

export function TeamCard(props: {
  name: string;
  photoUrl: string;
  id: string;
  memberCount?: number;
  isMember: boolean;
}) {
  let buttonView = null;
  if (props.isMember) {
    buttonView = (
      <Link to={`/teamprofile/${props.id}`}>
        <Button className='button-div'>View</Button>
      </Link>
    );
  } else {
    buttonView = null;
  }

  return (
    <section style={{ width: '15rem', height: '20rem' }} className='team-card'>
      <div className='team-photo'>
        <img alt='Team Photo' src={props.photoUrl} />
      </div>
      <div className='team-info'>
        <div className='title'>{props.name}</div>
        <div className='description'>Members count: {props.memberCount}</div>
        {buttonView}
        {/* <Link to={`/teamprofile/${props.id}`}>
          <Button className='button-div'>View</Button>
        </Link> */}
      </div>
    </section>
  );
}
