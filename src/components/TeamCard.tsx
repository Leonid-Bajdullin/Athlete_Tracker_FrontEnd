import React from 'react';
import { Button } from 'react-bootstrap';

export function TeamCard(props: {
  name: string;
  photoUrl: string;
  id: string;
  memberCount: number;
}) {
  return (
    <section className='team-card'>
      <div>
        <img alt='Team Photo' src={props.photoUrl} />
      </div>
      <div>id: {props.id}</div>
      <div>Team name: {props.name}</div>
      <div>Member count: {props.memberCount}</div>
      <div>
        <Button>View</Button>
        <Button variant='success'>Join</Button>
      </div>
    </section>
  );
}
