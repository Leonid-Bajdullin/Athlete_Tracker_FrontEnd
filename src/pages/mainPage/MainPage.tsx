import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Container } from 'typedi';

import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { TeamCard } from '../../components/TeamCard/TeamCard';
import { TeamService } from '../../services/TeamService';
import './MainPage.css';
import avengers from '../../photos/avengers.jpg';
import { UserProfile } from '../../components/UserProfile/UserProfile';

@inject('store')
@observer
export class MainPage extends Component<
  { store?: any },
  { allTeamsList: Array<any> }
> {
  teamService: TeamService;

  constructor(props: any) {
    super(props);

    this.teamService = Container.get(TeamService);

    this.state = {
      allTeamsList: [
        // {
        //   name: 'avengers',
        //   photoUrl: avengers,
        //   id: '1',
        //   memberCount: 11
        // }
      ]
    };
  }

  async componentDidMount() {
    const teamsList = await this.teamService.fetchFunc('GET', 'api/teams');
    this.setState({ allTeamsList: teamsList });
  }

  render() {
    let authorisationSection;
    if (this.props.store.isLoggedIn) {
      authorisationSection = (
        <div className="profile-tab">
          <div className="greeting-tab">
            Hello, {this.props.store.currentUser.firstName}
          </div>
          <UserProfile />
        </div>
      );
    } else {
      authorisationSection = (
        <div>
          <RegistrationForm /> or <LoginForm />
        </div>
      );
    }

    return (
      <div className="mainpage-container">
        <div className="content-wrap">
          <header className="header">
            <nav className="search-input">
              <input />
            </nav>
            <div className="app-title">ATHLETE TRACKER</div>
            {authorisationSection}
          </header>
          <main className="teamcards-list-container">
            <h2>All teams: {this.state.allTeamsList.length}</h2>
            <div className="all-teamcards-list">
              {this.state.allTeamsList.map(
                (item: {
                  name: string;
                  photoUrl: string;
                  id: string;
                  userTeams: Array<any>;
                }) => (
                  <>
                    <TeamCard
                      name={item.name}
                      photoUrl={item.photoUrl}
                      id={item.id}
                      memberCount={
                        item.userTeams ? item.userTeams.length : undefined
                      }
                    />
                    {/* <div>{item.userTeams}</div> */}
                  </>
                )
              )}
            </div>
          </main>
        </div>
        <footer className="footer">Footer</footer>
      </div>
    );
  }
}

export default MainPage;
