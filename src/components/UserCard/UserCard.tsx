import React, { Component } from 'react';
import { Button, OverlayTrigger } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';

import './UserCard.css';
import { UserService } from '../../services/UserService';
import { Container } from 'typedi';
import { UserCardPropsDto } from '../../dto/UserCardPropsDto';

@inject('store')
@observer
export class UserCard extends Component<UserCardPropsDto, {}> {
  userService: UserService;
  constructor(props: any) {
    super(props);

    this.userService = Container.get(UserService);

    this.state = {};
  }

  setMembersPosition = async (action: string): Promise<any> => {
    var userPosition =
      action === 'upgrade'
        ? this.props.position === 'coach'
          ? 'headcoach'
          : this.props.position === 'athlete'
          ? 'coach'
          : null
        : action === 'downgrade'
        ? this.props.position === 'coach'
          ? 'athlete'
          : this.props.position === 'headcoach'
          ? 'coach'
          : null
        : null;

    if (userPosition) {
      const data = {
        userId: this.props.id,
        teamId: this.props.teamId,
        position: userPosition
      };
      try {
        await this.userService.fetchFunc(
          'PUT',
          'api/userteams/setposition',
          data
        );
        this.props.onItemChange();
      } catch (err) {
        alert(err.message);
      }
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
    let positionLabel =
      this.props.position === 'headcoach'
        ? '#da4302'
        : this.props.position === 'coach'
        ? '#64c4ed'
        : this.props.position === 'athlete'
        ? '#01d28e'
        : '#f6f078';
    let buttonDiv = null;
    let deleteButton = null;
    let upgradeStyle = this.props.position === 'headcoach' ? true : false;
    let downgradeStyle = this.props.position === 'athlete' ? true : false;

    if (this.props.id === this.props.store.currentUser.id) {
      buttonDiv = null;
      deleteButton = null;
    } else if (this.props.position === 'pending') {
      buttonDiv = (
        <div className="button-div">
          <Button
            variant="success"
            className="usercard-button-left"
            onClick={this.acceptMember}
          >
            Accept
          </Button>
          <Button
            variant="danger"
            className="usercard-button-right"
            onClick={this.deleteMember}
          >
            Decline
          </Button>
        </div>
      );
      deleteButton = null;
    } else if (this.props.currUserPos === 'headcoach') {
      buttonDiv = (
        <div className="button-div">
          <Button
            variant="success"
            className="usercard-button-left"
            disabled={upgradeStyle}
            onClick={() => {
              this.setMembersPosition('upgrade');
            }}
          >
            Upgrade
          </Button>
          <Button
            variant="danger"
            className="usercard-button-right"
            disabled={downgradeStyle}
            onClick={() => {
              this.setMembersPosition('downgrade');
            }}
          >
            Downgrade
          </Button>
        </div>
      );

      const renderTooltip = (props: any) => (
        <div className="tooltip" {...props}>
          Delete this member from team
        </div>
      );
      deleteButton = (
        <OverlayTrigger placement="top" overlay={renderTooltip}>
          <div className="close" onClick={this.deleteMember}></div>
        </OverlayTrigger>
      );
    } else {
      buttonDiv = null;
      deleteButton = null;
    }

    return (
      <section className="user-card">
        <div className="user-photo">
          <img
            alt="User Photo"
            src={this.props.photoUrl || ''}
            onError={(e: any) => (e.target.src = '/user_default_image.jpg')}
          />
          <div className="position" style={{ backgroundColor: positionLabel }}>
            {this.props.position}
          </div>
          {deleteButton}
        </div>
        <div className="user-info">
          <div className="title">{this.props.fullName}</div>
          <div className="description">{this.props.email}</div>
          {buttonDiv}
        </div>
      </section>
    );
  }
}
