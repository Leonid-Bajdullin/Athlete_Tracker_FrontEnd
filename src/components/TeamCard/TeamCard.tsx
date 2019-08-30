import React, { Props } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import './TeamCard.css';

export const TeamCard = inject('store')(
  observer(
    (props: {
      name: string;
      photoUrl: string;
      teamId: string;
      memberCount?: number;
      isMember: boolean;
      userId: string;
      position?: string;
      store?: any;
    }) => {
      const joinTeam = async () => {
        const values = {
          userId: props.store.currentUser.id,
          teamId: props.teamId
        };
        props.store.joinTeamRequest(values);
      };

      let buttonView = null;
      if (props.isMember) {
        buttonView = (
          <Link to={`/teamprofile/${props.teamId}`}>
            <Button variant='primary' className='button-div'>
              View
            </Button>
          </Link>
        );
      } else {
        buttonView = (
          <Button variant='success' className='button-div' onClick={joinTeam}>
            Join
          </Button>
        );
      }

      return (
        <section
          style={{ width: '15rem', height: '20rem' }}
          className='team-card'
        >
          <div className='team-photo'>
            <img alt='Team Photo' src={props.photoUrl} />
          </div>
          <div className='team-info'>
            <div className='title'>{props.name}</div>
            <div className='description'>
              Members count: {props.memberCount}
            </div>
            {buttonView}
          </div>
        </section>
      );
    }
  )
);
