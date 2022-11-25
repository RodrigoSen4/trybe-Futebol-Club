import IMatch from '../interface/IMatch';
import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';

export default class MatchesService {
  static async getAll(inProgress: string): Promise<IMatch[]> {
    const matches = await MatchesModel.findAll({
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamsModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    if (inProgress === 'false') {
      const result = matches.filter((elm) => !elm.inProgress);

      return result as unknown as IMatch[];
    }
    if (inProgress === 'true') {
      const result = matches.filter((elm) => elm.inProgress);

      return result as unknown as IMatch[];
    }

    return matches as unknown as IMatch[];
  }
}
