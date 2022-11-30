import ILeaderboard from '../interface/ILeaderboard';

const efficiency = (home: any, away: any) => (((home.efficiency * home.totalGames)
+ (away.efficiency * away.totalGames))
    / (home.totalGames + away.totalGames)).toFixed(2);

const joiningArrays = (home: ILeaderboard[], away: ILeaderboard[]): ILeaderboard[] => {
  const leaderboard = [] as ILeaderboard[];
  home.forEach((h) => {
    away.forEach((a) => {
      if (h.name === a.name) {
        leaderboard.push({ name: h.name,
          totalPoints: h.totalPoints + a.totalPoints,
          totalGames: h.totalGames + a.totalGames,
          totalVictories: h.totalVictories + a.totalVictories,
          totalDraws: h.totalDraws + a.totalDraws,
          totalLosses: h.totalLosses + a.totalLosses,
          goalsFavor: h.goalsFavor + a.goalsFavor,
          goalsOwn: h.goalsOwn + a.goalsOwn,
          goalsBalance: h.goalsBalance + a.goalsBalance,
          efficiency: efficiency(h, a) });
      }
    });
  });
  return leaderboard;
};

export default joiningArrays;
