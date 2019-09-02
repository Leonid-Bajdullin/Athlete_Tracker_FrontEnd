import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import './UserCard.css';
import { UserService } from '../../services/UserService';
import Container from 'typedi';
import { async } from 'q';

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

  acceptMember = async () => {
    const values = {
      userId: this.props.id.toString(),
      teamId: this.props.teamId
    };
    this.userService.fetchFunc('PUT', 'api/userteams', values).then((res) => {
      this.props.onItemChange();
    });
  };

  declineMember = async () => {
    const values = {
      userId: this.props.id.toString(),
      teamId: this.props.teamId
    };
    this.userService
      .fetchFunc('DELETE', 'api/userteams', values)
      .then((res) => {
        alert(res.message);
        this.props.onItemChange();
      });
  };

  render() {
    let buttonDiv = null;
    buttonDiv =
      this.props.position === 'pending' ? (
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
            onClick={this.declineMember}
          >
            Decline
          </Button>
        </div>
      ) : this.props.currUserPos === 'headcoach' ? (
        (buttonDiv = (
          <div className='button-div'>
            <Button variant='success' className='usercard-button-left'>
              Upgrade
            </Button>
            <Button variant='danger' className='usercard-button-right'>
              Downgrade
            </Button>
          </div>
        ))
      ) : (
        (buttonDiv = null)
      );

    return (
      <section
        style={{ width: '15rem', height: '20rem' }}
        className='user-card'
      >
        <div className='user-photo'>
          <img alt='User Photo' src={this.props.photoUrl} />
          <div className='position'>{this.props.position}</div>
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
