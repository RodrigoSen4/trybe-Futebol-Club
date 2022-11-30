import { Request, Response } from 'express';
import LeaderboardsService from '../service/LeaderboardsService';

export default class LeaderboardsController {
  static async getLeaderboardHome(req: Request, res: Response) {
    const leaderboardsHome = await LeaderboardsService.getLeaderboardHomeOrAway('teamHome');

    return res.status(200).json(leaderboardsHome);
  }

  static async getLeaderboardAway(req: Request, res: Response) {
    const leaderboardsAway = await LeaderboardsService.getLeaderboardHomeOrAway('teamAway');

    return res.status(200).json(leaderboardsAway);
  }

  static async getLeaderboard(req: Request, res: Response) {
    const leaderboard = await LeaderboardsService.getLeaderboardAll();

    return res.status(200).json(leaderboard);
  }
}
