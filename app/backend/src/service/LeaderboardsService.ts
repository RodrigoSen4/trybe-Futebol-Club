import ILeaderboard from '../interface/ILeaderboard';
import TeamsModel from '../database/models/TeamsModel';
import MatchesModels from '../database/models/MatchesModel';
import leaderboardAwayCreate from '../utils/leaderboardAwayCreate';
import leaderboardHomeCreate from '../utils/leaderboardHomeCreate';
import joiningArrays from '../utils/leaderboard';

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

  static async getLeaderboardHomeOrAway(team: string) {
    const data = await TeamsModel.findAll({
      include: [{
        model: MatchesModels,
        as: team,
        where: { inProgress: false },
      }],
    });

    if (team === 'teamHome') {
      const leaderboard = data.map((element) => leaderboardHomeCreate(element));
      const leaderboardOredened = this.leaderboardOrder(leaderboard);

      return leaderboardOredened;
    }

    const leaderboard = data.map((element) => leaderboardAwayCreate(element));
    const leaderboardOredened = this.leaderboardOrder(leaderboard);

    return leaderboardOredened;
  }

  static async getLeaderboardAll(): Promise <ILeaderboard[]> {
    const home = await this.getLeaderboardHomeOrAway('teamHome');
    const away = await this.getLeaderboardHomeOrAway('teamAway');

    const leaderboard = joiningArrays(home, away);

    const leaderboardOrder = this.leaderboardOrder(leaderboard);

    return leaderboardOrder;
  }
}
