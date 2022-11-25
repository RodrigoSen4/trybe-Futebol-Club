import ErrorMap from '../utils/errorMap';

interface ICreateMatch {
  id?: number
  homeTeam?: number;
  awayTeam?: number;
  homeTeamGoals?: number;
  awayTeamGoals?: number;
  inProgress?: string;
  type: ErrorMap | null;
  message: string | object;
}

export default ICreateMatch;
