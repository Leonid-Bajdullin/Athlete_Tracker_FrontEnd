import { Service } from 'typedi';

import { BaseService } from './BaseService';
import { async } from 'q';

@Service()
export class UserService extends BaseService {
  public submitRegistration = async (values: any) => {
    await this.fetchFunc('POST', 'api/users', values);
  };

  public submitLogin = async (values: any): Promise<any> => {
    return await this.fetchFunc('POST', 'api/login', values);
  };

  public getUserTeams = async (id: string) => {
    return await this.fetchFunc('GET', `api/users/teams/${id}`);
  };

  public saveProfileChanges = async (id: string, values: any) => {
    return await this.fetchFunc('PUT', `api/users/${id}`, values);
  };
}
