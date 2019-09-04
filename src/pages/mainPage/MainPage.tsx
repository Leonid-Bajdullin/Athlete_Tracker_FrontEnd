import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Container } from 'typedi';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { TeamCard } from '../../components/TeamCard/TeamCard';
import { TeamService } from '../../services/TeamService';
import { UserProfile } from '../../components/UserProfile/UserProfile';
import './MainPage.css';
import { TeamCreateForm } from '../../components/TeamCreateForm/TeamCreateForm';

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
      allTeamsList: []
    };
  }

  checkStorage = () => {
    if (localStorage.getItem('token')) {
      this.props.store.getCurrentUser();
    }
  };

  async componentDidMount() {
    debugger;
    await this.checkStorage();
    const teamsList = await this.teamService.fetchFunc('GET', 'api/teams');
    this.setState({ allTeamsList: teamsList });
  }

  render() {
    const currentUser = this.props.store.currentUser;

    let authorisationSection;
    if (this.props.store.isLoggedIn) {
      authorisationSection = (
        <div className='profile-tab'>
          <Button variant='danger' onClick={this.props.store.signOut}>
            Sign out
          </Button>
          <div className='greeting-tab'>Hello, {currentUser.firstName}</div>
          <UserProfile />
        </div>
      );
    } else {
      authorisationSection = (
        <div className='profile-tab'>
          <RegistrationForm />
          <div className='greeting-tab'>
            If you already
            <br /> registered >>>
          </div>
          <LoginForm />
        </div>
      );
    }

    return (
      <div className='mainpage-container'>
        <div className='content-wrap'>
          <header className='header'>
            <nav className='search-input'>
              <input />
            </nav>
            <div className='app-title'>
              <Link to='/'>ATHLETE TRACKER</Link>
            </div>
            {authorisationSection}
          </header>
          <main className='teamcards-list-container'>
            <h2>All teams: {this.state.allTeamsList.length}</h2>
            <div className='all-teamcards-list'>
              <TeamCreateForm />
              {this.state.allTeamsList.map(
                (item: {
                  name: string;
                  photoUrl: string;
                  id: string;
                  userTeams: Array<any>;
                }) => {
                  let userTeam = _.find(
                    this.props.store.userTeams,
                    (team) => team.id === item.id
                  );

                  return (
                    <TeamCard
                      name={item.name}
                      photoUrl={item.photoUrl}
                      teamId={item.id}
                      memberCount={
                        item.userTeams
                          ? item.userTeams.filter(
                              (el) => el.position !== 'pending'
                            ).length
                          : undefined
                      }
                      position={userTeam ? userTeam.position : undefined}
                      userId={currentUser.id}
                    />
                  );
                }
              )}
            </div>
          </main>
        </div>
        <footer className='footer'>Copyright© Leo Peo, 2019</footer>
      </div>
    );
  }
}

export default MainPage;
