import ErrorMap from '../utils/errorMap';
import ICreateMatch from '../interface/ICreateMatch';
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

  static async createMatches(body: ICreateMatch): Promise<ICreateMatch> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = body;

    if (homeTeam === awayTeam) {
      return {
        type: ErrorMap.UNPROCESSABLE,
        message: 'It is not possible to create a match with two equal teams' };
    }

    const team1 = await TeamsModel.findOne({ where: { id: homeTeam } });
    const team2 = await TeamsModel.findOne({ where: { id: awayTeam } });

    if (!team1 || !team2) {
      return { type: ErrorMap.NOT_FOUND, message: 'There is no team with such id!' };
    }

    const createMatche = await MatchesModel.create({ homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });

    return { type: null, message: createMatche };
  }

  static async finishedMatche(id: number): Promise <ICreateMatch> {
    await MatchesModel.update({ inProgress: false }, { where: { id } });

    return { type: null, message: 'Finished' };
  }

  static async updateMatch(id: number, body: ICreateMatch): Promise <ICreateMatch> {
    const { homeTeamGoals, awayTeamGoals } = body;
    await MatchesModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return { type: null, message: 'Success' };
  }
}
