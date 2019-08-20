import React, { Component } from 'react';
import { TeamCard } from './TeamCard';
import avengers from '../../photos/avengers.jpg';
import CommunicationService from '../../utils/CommunicationService';

export class AllTeamCardsList extends Component<{}, { allTeamsList: any }> {
  constructor(props: object) {
    super(props);

    this.state = {
      allTeamsList: [
        {
          name: 'avengers',
          photoUrl: avengers,
          id: '1',
          memberCount: 11
        },
        {
          name: 'avengers',
          photoUrl: avengers,
          id: '1',
          memberCount: 11
        },
        {
          name: 'avengers',
          photoUrl: avengers,
          id: '1',
          memberCount: 11
        },
        {
          name: 'avengers',
          photoUrl: avengers,
          id: '1',
          memberCount: 11
        }
      ]
    };
  }

  async componentDidMount() {
    const teamsList = await CommunicationService.fetchFunc('GET', 'api/teams');
    this.setState({ allTeamsList: teamsList });
  }

  render() {
    return (
      <div className='all-teamcards-list'>
        {this.state.allTeamsList.map(
          (item: {
            name: string;
            photoUrl: string;
            id: string;
            memberCount: number;
          }) => (
            <TeamCard
              name={item.name}
              photoUrl={item.photoUrl}
              id={item.id}
              memberCount={item.memberCount}
            />
          )
        )}
      </div>
    );
  }
}
