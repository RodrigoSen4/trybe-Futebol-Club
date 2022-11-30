import joiningArrays from '../utils/leaderboard';
import ILeaderboard from '../interface/ILeaderboard';
import TeamsModel from '../database/models/TeamsModel';
import MatchesModels from '../database/models/MatchesModel';
import leaderboardAwayCreate from '../utils/leaderboardAwayCreate';
import leaderboardHomeCreate from '../utils/leaderboardHomeCreate';

export default class LeaderboardsService {
  static leaderboardOrder(leaderboard: ILeaderboard[]): ILeaderboard[] {
    return leaderboard.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn
    ));
  }

  static async getLeaderboardHome(): Promise <ILeaderboard[]> {
    const data = await TeamsModel.findAll({
      include: [{
        model: MatchesModels,
        as: 'teamHome',
        where: { inProgress: false },
      }],
    });

    const leaderboard = data.map((element) => leaderboardHomeCreate(element));
    const leaderboardOredened = this.leaderboardOrder(leaderboard);

    return leaderboardOredened;
  }

  static async getLeaderboardAway(): Promise <ILeaderboard[]> {
    const data = await TeamsModel.findAll({
      include: [{
        model: MatchesModels,
        as: 'teamAway',
        where: { inProgress: false },
      }],
    });

    const leaderboard = data.map((element) => leaderboardAwayCreate(element));
    const leaderboardOredened = this.leaderboardOrder(leaderboard);

    return leaderboardOredened;
  }

  static async getLeaderboard(): Promise <ILeaderboard[]> {
    const home = await this.getLeaderboardHome();
    const away = await this.getLeaderboardAway();

    const leaderboard = joiningArrays(home, away);

    const leaderboardOrder = this.leaderboardOrder(leaderboard);

    return leaderboardOrder;
  }
}
