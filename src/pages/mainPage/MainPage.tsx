import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import ironman from '../../photos/ironman.jpg';
import avengers from '../../photos/avengers.jpg';
import { TeamCard } from '../../components/TeamCard/TeamCard';
import './MainPage.css';
// import { BaseService } from '../../services/BaseService';

@observer
export class MainPage extends Component<{}, { allTeamsList: any }> {
  constructor(props: any) {
    super(props);

    this.state = {
      allTeamsList: [
        {
          name: 'avengers',
          photoUrl: ironman,
          id: '1',
          memberCount: 11
        },
        {
          name: 'avengers',
          photoUrl: ironman,
          id: '2',
          memberCount: 11
        },
        {
          name: 'avengers',
          photoUrl: avengers,
          id: '3',
          memberCount: 11
        },
        {
          name: 'avengers',
          photoUrl: ironman,
          id: '4',
          memberCount: 11
        },
        {
          name: 'avengers',
          photoUrl: avengers,
          id: '3',
          memberCount: 11
        },
        {
          name: 'avengers',
          photoUrl: avengers,
          id: '3',
          memberCount: 11
        },
        {
          name: 'avengers',
          photoUrl: avengers,
          id: '3',
          memberCount: 11
        },
        {
          name: 'avengers',
          photoUrl: avengers,
          id: '3',
          memberCount: 11
        }
      ]
    };
  }

  // async componentDidMount() {
  //   const teamsList = await BaseService.fetchFunc('GET', 'api/teams');
  //   this.setState({ allTeamsList: teamsList });
  // }

  render() {
    return (
      <div className='mainpage-container'>
        <div className='content-wrap'>
          <header className='header'>
            <input />
            <div>ATHLETE TRACKER</div>
            <div>
              <RegistrationForm /> or <LoginForm />
            </div>
          </header>
          <main className='teamcards-list-container'>
            <h2>All teams: {this.state.allTeamsList.length}</h2>
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
          </main>
        </div>
        <footer className='footer'>Footer</footer>
      </div>
    );
  }
}

export default MainPage;
