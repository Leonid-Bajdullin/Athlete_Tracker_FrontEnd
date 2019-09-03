import { Service } from 'typedi';

import { BaseService } from './BaseService';

@Service()
export class TeamService extends BaseService {
  public submitTeamCreate = async (data: any) => {
    await this.fetchFunc('POST', 'api/teams', data);
  };
}
