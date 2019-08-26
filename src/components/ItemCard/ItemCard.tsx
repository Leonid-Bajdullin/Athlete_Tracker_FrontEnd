import React from 'react';
import { Button } from 'react-bootstrap';

import './ItemCard.css';

export function ItemCard(props: {
  title: string;
  photoUrl: string;
  id: string;
  info: any;
  position?: string | null;
}) {
  let buttonDiv = null;
  if (props.position === null) {
    buttonDiv = <Button className="button-div">View</Button>;
  } else if (props.position === 'headcoach') {
    buttonDiv = (
      <div className="button-div">
        <Button variant="success" className="itemcard-button-left">
          Upgrade
        </Button>
        <Button variant="danger" className="itemcard-button-right">
          Downgrade
        </Button>
      </div>
    );
  } else if (props.position === 'coach' || 'athlete') {
    buttonDiv = null;
  }

  return (
    <section style={{ width: '15rem', height: '20rem' }} className="item-card">
      <div className="item-photo">
        <img alt="Team Photo" src={props.photoUrl} />
      </div>
      <div className="item-info">
        <div className="title">{props.title}</div>
        {/* <div>{props.id}</div> */}
        <div className="description">{props.info}</div>
        {buttonDiv}
      </div>
    </section>
  );
}
