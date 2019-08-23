import { observable, action } from 'mobx';

import { BaseService } from '../services/BaseService';
import { RootStore } from './RootStore';

export class UserStore {
  constructor(rootStore: any) {
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
