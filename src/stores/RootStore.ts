import { observable, action } from 'mobx';

import { UserService } from '../services/UserService';

export class RootStore {
  constructor(private userService: UserService) {}

  defaultUser = {
    firstName: '',
    lastName: '',
    email: '',
    nickname: '',
    phone: '',
    photoUrl: 'https://live.staticflickr.com/6067/6076982585_4a72cb6871_b.jpg',
    data: {
      address: {
        city: 'Kharkiv',
        postalCode: '',
        street: '',
        house: '',
        apartment: ''
      }
    }
  };
  @observable currentUser: any = {};
  @observable userTeams: Array<{ id: string; position: string }> = [];
  @observable isLoggedIn: boolean = false;
  @observable token: string = '';
  @observable allUsers: Array<any> = [];

  // user methods
  @action loginUser = async (values: any) => {
    this.userService
      .submitLogin(values)
      .then((result) => {
        this.userService
          .getUserTeams(result.user.id)
          .then((userTeams) => (this.userTeams = userTeams));
        this.currentUser = result.user;
        this.token = result.token;
        this.isLoggedIn = true;
      })
      .catch((result) => {
        alert(result.message);
      });
  };

  @action getUserTeams = async (id: string) => {
    this.userTeams = await this.userService.getUserTeams(id);
  };

  @action signOut = () => {
    this.currentUser = {};
    this.userTeams = [];
    this.isLoggedIn = false;
  };

  @action saveUserProfile = async (id: string, values: any) => {
    const newUserData = await this.userService.saveProfileChanges(id, values);
    this.currentUser = newUserData;
  };

  // userTeam methods
  @action joinTeamRequest = async (values: any) => {
    this.userService
      .fetchFunc('POST', 'api/userteams', values)
      .then(() => this.getUserTeams(this.currentUser.id));
  };
}
