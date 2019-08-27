import React, { Component } from 'react';
import { UserCard } from '../../components/UserCard/UserCard';
import { TeamService } from '../../services/TeamService';
import Container from 'typedi';

export class TeamProfile extends Component<
  { id: string },
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
    const team = await this.teamService.fetchFunc(
      'GET',
      `api/teams/${this.props.id}`
    );
    this.setState({ teamInfo: team });

    const members = await this.teamService.fetchFunc(
      'GET',
      `api/teams/members/${this.props.id}`
    );
    this.setState({ membersList: members });
  }

  render() {
    return (
      <div>
        <header>
          <img></img>
          <div>{}</div>
        </header>
        <main>
          {this.state.membersList.map((item: any) => (
            <UserCard
              fullName={`${item.user.firstName} ${item.user.lastName}`}
              photoUrl={item.user.photoUrl}
              id={item.user.id}
              email={item.user.email}
              position={item.position}
            ></UserCard>
          ))}
        </main>
        <footer>Footer</footer>
      </div>
    );
  }
}
