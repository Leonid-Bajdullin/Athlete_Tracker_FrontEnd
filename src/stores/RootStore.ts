import { observable, action } from 'mobx';

import { UserService } from '../services/UserService';

export class RootStore {
  constructor(private userService: UserService) {}

  @observable currentUser: any = {
    firstName: 'Leo',
    lastName: 'Peo',
    email: 'lbajdull@gmail.com',
    password: 'free2play',
    nickname: 'Adanax'
  };

  @observable token: string = '';

  @observable allUsers: any = [];

  @action loginUser = async (values: any) => {
    const result = await this.userService.submitLogin(values);
    this.currentUser = result.user;
    this.token = result.token;
  };

  @action getAllTeams = async () => {
    const users = await this.userService.fetchFunc('GET', 'api/teams');
    this.allUsers = users;
    return users;
  };
}
