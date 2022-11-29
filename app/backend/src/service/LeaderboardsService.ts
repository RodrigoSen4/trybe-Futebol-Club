import TeamsModel from '../database/models/TeamsModel';
import MatchesModels from '../database/models/MatchesModel';
import leaderboardCreate from '../utils/leaderboardCreate';

export default class LeaderboardsService {
  static async getLeaderboardHome() {
    const data = await TeamsModel.findAll({
      include: [{
        model: MatchesModels,
        as: 'teamHome',
        where: { inProgress: false },
      }],
    });

    const leaderboard = data.map((element) => leaderboardCreate(element));

    const leaderboardOredened = leaderboard.sort((a, b) => (
      b.totalPoints - a.totalPoints
              || b.totalVictories - a.totalVictories
              || b.goalsBalance - a.goalsBalance
              || b.goalsFavor - a.goalsFavor
              || a.goalsOwn - b.goalsOwn
    ));

    return leaderboardOredened;
  }
}
