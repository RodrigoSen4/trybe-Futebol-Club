import IMatch from '../interface/IMatch';

const calculte = (team: IMatch[]) => {
  let points = 0;
  let victories = 0;
  let draws = 0;
  let losses = 0;

  team.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals < awayTeamGoals) losses += 1;

    if (homeTeamGoals > awayTeamGoals) {
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

const goalsFavor = (team: IMatch[]) => team.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);

const goalsOwn = (team: IMatch[]) => team.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);

const efficiency = (totalPoints: number, totalGames:number) => ((totalPoints
/ (totalGames * 3)) * 100).toFixed(2);

const leaderboardHomeCreate = ({ teamName, teamHome }: any) => {
  const leaderboards = {
    name: teamName,
    totalPoints: calculte(teamHome).points,
    totalGames: teamHome.length,
    totalVictories: calculte(teamHome).victories,
    totalDraws: calculte(teamHome).draws,
    totalLosses: calculte(teamHome).losses,
    goalsFavor: goalsFavor(teamHome),
    goalsOwn: goalsOwn(teamHome),
    goalsBalance: goalsFavor(teamHome) - goalsOwn(teamHome),
    efficiency: efficiency(calculte(teamHome).points, teamHome.length),
  };

  return leaderboards;
};

export default leaderboardHomeCreate;
