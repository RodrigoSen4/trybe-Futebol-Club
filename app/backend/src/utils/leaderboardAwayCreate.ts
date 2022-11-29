import IMatch from '../interface/IMatch';

const calculte = (team: IMatch[]) => {
  let points = 0;
  let victories = 0;
  let draws = 0;
  let losses = 0;

  team.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (awayTeamGoals < homeTeamGoals) losses += 1;

    if (awayTeamGoals > homeTeamGoals) {
      points += 3;
      victories += 1;
    }

    if (homeTeamGoals === awayTeamGoals) {
      draws += 1;
      points += 1;
    }
  });

  return { points, losses, draws, victories };
};

const goalsFavor = (team: IMatch[]) => team.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);

const goalsOwn = (team: IMatch[]) => team.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);

const efficiency = (totalPoints: number, totalGames:number) => ((totalPoints
/ (totalGames * 3)) * 100).toFixed(2);

const leaderboardAwayCreate = ({ teamName, teamAway }: any) => {
  const leaderboards = {
    name: teamName,
    totalPoints: calculte(teamAway).points,
    totalGames: teamAway.length,
    totalVictories: calculte(teamAway).victories,
    totalDraws: calculte(teamAway).draws,
    totalLosses: calculte(teamAway).losses,
    goalsFavor: goalsFavor(teamAway),
    goalsOwn: goalsOwn(teamAway),
    goalsBalance: goalsFavor(teamAway) - goalsOwn(teamAway),
    efficiency: efficiency(calculte(teamAway).points, teamAway.length),
  };

  return leaderboards;
};

export default leaderboardAwayCreate;
