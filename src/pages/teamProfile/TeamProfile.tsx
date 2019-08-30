import React, { Component } from 'react';
import { UserCard } from '../../components/UserCard/UserCard';
import { TeamService } from '../../services/TeamService';
import Container from 'typedi';

import './TeamProfile.css';
import { Link } from 'react-router-dom';

export class TeamProfile extends Component<
  { match: any },
  { teamInfo: any; membersList: Array<any> }
> {
  teamService: TeamService;
  constructor(props: any) {
    super(props);

    this.teamService = Container.get(TeamService);

    this.state = {
      teamInfo: {},
      membersList: []
    };
  }

  async componentDidMount() {
    const {
      match: { params }
    } = this.props;
    const team = await this.teamService.fetchFunc(
      'GET',
      `api/teams/${params.teamId}`
    );
    this.setState({ teamInfo: team });

    const members = await this.teamService.fetchFunc(
      'GET',
      `api/teams/members/${params.teamId}`
    );
    this.setState({ membersList: members });
  }

  render() {
    return (
      <div className='teamprofile-container'>
        <header className='team-profile-header'>
          <div className='app-title'>
            <Link to='/'>ATHLETE TRACKER</Link>
          </div>
        </header>
        <div className='team-profile-top'>
          <div className='team-profile-photo'>
            <img src={this.state.teamInfo.photoUrl}></img>
          </div>
          <section className='team-profile-description'>
            <h2>Description:</h2>
            <div>{this.state.teamInfo.description}</div>
          </section>
        </div>
        <main className='members-list-container'>
          <h2>Team members: {this.state.membersList.length}</h2>
          <div className='all-members-list'>
            {this.state.membersList.map((item: any) => (
              <UserCard
                fullName={`${item.user.firstName} ${item.user.lastName}`}
                photoUrl={item.user.photoUrl}
                id={item.user.id}
                email={item.user.email}
                position={item.position}
              />
            ))}
          </div>
        </main>
        <footer className='footer'>Copyright© Leo Peo, 2019</footer>
      </div>
    );
  }
}
