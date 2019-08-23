import { UserStore } from './UserStore';

export class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
  }
}
