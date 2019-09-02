import { Service } from 'typedi';

import { BaseService } from './BaseService';

@Service()
export class UserService extends BaseService {
  public submitRegistration = async (
    values: any
  ): Promise<{ user: any; token: string }> => {
    return this.fetchFunc('POST', 'api/users', values).catch((result) =>
      alert(result.message)
    );
  };

  public submitLogin = async (values: any): Promise<any> => {
    return await this.fetchFunc('POST', 'api/login', values);
  };

  public getUserTeams = (id: string) => {
    return this.fetchFunc('GET', `api/users/teams/${id}`);
  };

  public saveProfileChanges = async (id: string, values: any) => {
    return await this.fetchFunc('PUT', `api/users/${id}`, values);
  };
}
