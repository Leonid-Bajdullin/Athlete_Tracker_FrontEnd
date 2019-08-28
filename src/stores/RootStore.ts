import { observable, action } from 'mobx';

import { UserService } from '../services/UserService';

export class RootStore {
  constructor(private userService: UserService) {}

  @observable currentUser: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
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
  @observable isLoggedIn: boolean = false;

  @observable token: string = '';

  @observable allUsers: any = [];

  @action loginUser = async (values: any) => {
    const result = await this.userService.submitLogin(values);
    this.currentUser = result.user;
    this.token = result.token;
    this.isLoggedIn = true;
  };

  @action saveUserProfile = async (id: string, values: any) => {
    const newUserData = await this.userService.saveProfileChanges(id, values);
    this.currentUser = newUserData;
  };
}
