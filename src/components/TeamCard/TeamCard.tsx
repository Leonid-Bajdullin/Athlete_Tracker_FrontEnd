import React from 'react';
import { Button, Card } from 'react-bootstrap';

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

    // <Card
    //   border='primary'
    //   style={{
    //     width: '14rem',
    //     height: '21rem',
    //     margin: '0.5rem',
    //     borderRadius: '0.5rem'
    //   }}
    // >
    //   <Card.Img variant='top' width='100%' height='50%' src={props.photoUrl} />
    //   <Card.Body>
    //     <Card.Title>
    //       {props.id} : {props.name}
    //     </Card.Title>
    //     <Card.Text>
    //       <div>Members count : {props.memberCount}</div>
    //     </Card.Text>
    //     <Button variant='primary'>View</Button>
    //   </Card.Body>
    // </Card>
  );
}
