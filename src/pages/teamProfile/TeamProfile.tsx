import React, { Component } from 'react';
import { UserCard } from '../../components/UserCard/UserCard';
import { TeamService } from '../../services/TeamService';
import Container from 'typedi';
import { inject, observer } from 'mobx-react';
import _ from 'lodash';

import './TeamProfile.css';
import { Link } from 'react-router-dom';

@inject('store')
@observer
export class TeamProfile extends Component<
  { match: any; store?: any },
  {
    teamInfo: any;
    membersList: Array<any>;
    currUserPos: string;
    pendingMembersList: Array<any>;
  }
> {
  teamService: TeamService;
  constructor(props: any) {
    super(props);

    this.teamService = Container.get(TeamService);

    this.state = {
      teamInfo: {},
      membersList: [],
      pendingMembersList: [],
      currUserPos: ''
    };
  }

  teamID = this.props.match.params.teamId;

  async componentDidMount() {
    const team = await this.teamService.fetchFunc(
      'GET',
      `api/teams/${this.teamID}`
    );
    this.setState({ teamInfo: team });

    this.loadMembers();

    let userTeam = _.find(
      this.props.store.userTeams,
      (team) => team.id === +this.teamID
    );

    if (userTeam) {
      this.setState({ currUserPos: userTeam.position });
    } else {
      this.setState({ currUserPos: '' });
    }
  }

  loadMembers = async () => {
    const members = await this.teamService.fetchFunc(
      'GET',
      `api/teams/members/${this.teamID}`
    );
    this.setState({ membersList: members });

    const pendingMembers = await this.teamService.fetchFunc(
      'GET',
      `api/teams/pendingmembers/${this.teamID}`
    );
    this.setState({ pendingMembersList: pendingMembers });
  };

  render() {
    // prettier-ignore
    let pendingMembersList =
      (this.state.currUserPos === 'athlete') ? null : this.state
          .pendingMembersList.length < 1 ? null : (
        <main className='members-list-container'>
          <h2>Pending members</h2>
          <div className='all-members-list'>
            {this.state.pendingMembersList.map((item: any) => (
              <UserCard
                fullName={`${item.user.firstName} ${item.user.lastName}`}
                photoUrl={item.user.photoUrl}
                id={item.user.id}
                teamId={this.teamID}
                email={item.user.email}
                position={item.position}
                currUserPos={this.state.currUserPos}
                onItemChange={()=>{this.loadMembers()}}
              />
            ))}
          </div>
        </main>
      );

    let membersList = (
      <main className='members-list-container'>
        <h2>Team members: {this.state.membersList.length}</h2>
        <div className='all-members-list'>
          {this.state.membersList.map((item: any) => (
            <UserCard
              fullName={`${item.user.firstName} ${item.user.lastName}`}
              photoUrl={item.user.photoUrl}
              id={item.user.id}
              teamId={this.teamID}
              email={item.user.email}
              position={item.position}
              currUserPos={this.state.currUserPos}
              onItemChange={() => {
                this.loadMembers();
              }}
            />
          ))}
        </div>
      </main>
    );

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
        {membersList}
        {pendingMembersList}
        <footer className='footer'>Copyright© Leo Peo, 2019</footer>
      </div>
    );
  }
}
