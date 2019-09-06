import React, { Component } from 'react';
import { Button, OverlayTrigger } from 'react-bootstrap';

import './UserCard.css';
import { UserService } from '../../services/UserService';
import Container from 'typedi';

export class UserCard extends Component<
  {
    fullName: string;
    photoUrl: string;
    id: string;
    teamId: string;
    email: string;
    position: string;
    currUserPos: string;
    onItemChange: any;
  },
  {}
> {
  userService: UserService;
  constructor(props: any) {
    super(props);

    this.userService = Container.get(UserService);

    this.state = {};
  }

  upgradeMember = async () => {
    const position =
      this.props.position === 'coach'
        ? 'headcoach'
        : this.props.position === 'athlete'
        ? 'coach'
        : null;
    if (position) {
      const data = {
        userId: this.props.id,
        teamId: this.props.teamId,
        position: position
      };
      await this.userService.fetchFunc(
        'PUT',
        'api/userteams/setposition',
        data
      );
    } else {
      return null;
    }
  };

  acceptMember = async () => {
    const values = {
      userId: this.props.id.toString(),
      teamId: this.props.teamId
    };
    this.userService
      .fetchFunc('PUT', 'api/userteams/accept', values)
      .then(() => {
        this.props.onItemChange();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  deleteMember = async () => {
    const values = {
      userId: this.props.id.toString(),
      teamId: this.props.teamId
    };
    this.userService
      .fetchFunc('DELETE', 'api/userteams', values)
      .then(() => {
        this.props.onItemChange();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  render() {
    let buttonDiv = null;
    let deleteButton = null;

    if (this.props.position === 'pending') {
      buttonDiv = (
        <div className='button-div'>
          <Button
            variant='success'
            className='usercard-button-left'
            onClick={this.acceptMember}
          >
            Accept
          </Button>
          <Button
            variant='danger'
            className='usercard-button-right'
            onClick={this.deleteMember}
          >
            Decline
          </Button>
        </div>
      );
      deleteButton = null;
    } else if (this.props.currUserPos === 'headcoach') {
      buttonDiv = (
        <div className='button-div'>
          <Button
            variant='success'
            className='usercard-button-left'
            onClick={this.upgradeMember}
          >
            Upgrade
          </Button>
          <Button variant='danger' className='usercard-button-right'>
            Downgrade
          </Button>
        </div>
      );
      const renderTooltip = (props: any) => (
        <div className='tooltip' {...props}>
          Delete this member from team
        </div>
      );
      deleteButton = (
        <OverlayTrigger placement='top' overlay={renderTooltip}>
          <div className='close' onClick={this.deleteMember}></div>
        </OverlayTrigger>
      );
    } else {
      buttonDiv = null;
      deleteButton = null;
    }

    return (
      <section
        style={{ width: '15rem', height: '20rem' }}
        className='user-card'
      >
        <div className='user-photo'>
          <img alt='User Photo' src={this.props.photoUrl} />
          <div className='position'>{this.props.position}</div>
          {deleteButton}
        </div>
        <div className='user-info'>
          <div className='title'>{this.props.fullName}</div>
          <div className='description'>{this.props.email}</div>
          {buttonDiv}
        </div>
      </section>
    );
  }
}
