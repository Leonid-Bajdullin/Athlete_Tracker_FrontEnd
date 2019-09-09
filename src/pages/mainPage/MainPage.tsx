import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Container } from 'typedi';
import _ from 'lodash';

import { TeamCard } from '../../components/TeamCard/TeamCard';
import { TeamService } from '../../services/TeamService';
import './MainPage.css';
import { TeamCreateForm } from '../../components/TeamCreateForm/TeamCreateForm';
import { Header } from '../../components/Header/Header';

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

  getAllTeams = async () => {
    this.teamService
      .fetchFunc('GET', 'api/teams')
      .then((teamsList) => {
        this.setState({ allTeamsList: teamsList });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  componentDidMount() {
    this.checkStorage();
    this.getAllTeams();
  }

  render() {
    const currentUser = this.props.store.currentUser;
    const teamCreateForm = this.props.store.isLoggedIn ? (
      <TeamCreateForm
        onItemChange={() => {
          this.getAllTeams();
        }}
      />
    ) : null;

    return (
      <div className='mainpage-container'>
        <div className='content-wrap'>
          <Header></Header>
          <main className='teamcards-list-container'>
            <h2>All teams: {this.state.allTeamsList.length}</h2>
            <div className='all-teamcards-list'>
              {teamCreateForm}
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
