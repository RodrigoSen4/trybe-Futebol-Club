import TeamsModel from '../database/models/TeamsModel';

export default class TeamsService {
  static async getAll() {
    const allTeams = TeamsModel.findAll();
    return allTeams;
  }

  static async findById(id: number) {
    const teamId = TeamsModel.findByPk(id);
    return teamId;
  }
}
