import React, { Props } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import _ from 'lodash';

import './TeamCard.css';

export const TeamCard = inject('store')(
  observer(
    (props: {
      name: string;
      photoUrl: string;
      teamId: string;
      memberCount?: number;
      position: string;
      userId: string;
      store?: any;
    }) => {
      const joinTeam = async () => {
        const values = {
          userId: props.store.currentUser.id,
          teamId: props.teamId
        };
        props.store.joinTeamRequest(values);
      };
      let teamMemberStates = ['athlete', 'coach', 'headcoach'];

      var buttonView: any = _.isEmpty(props.store.currentUser)
        ? null
        : _.includes(teamMemberStates, props.position)
        ? (buttonView = (
            <Link to={`/teamprofile/${props.teamId}`}>
              <Button variant='primary' className='button-div'>
                View
              </Button>
            </Link>
          ))
        : props.position === 'pending'
        ? (buttonView = (
            <Button variant='warning' className='button-div' disabled>
              Waiting approval
            </Button>
          ))
        : !props.position
        ? (buttonView = (
            <Button variant='success' className='button-div' onClick={joinTeam}>
              Join
            </Button>
          ))
        : null;

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
