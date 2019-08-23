import { observable, action } from 'mobx';
import { BaseService } from '../services/BaseService';

export class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable currentUser = {};
  @observable allUsers: any = [];

  @action getAllTeams = async () => {
    const users = await this.baseService.fetchFunc('GET', 'api/teams');
    this.allUsers = users;
    return users;
  };
}
