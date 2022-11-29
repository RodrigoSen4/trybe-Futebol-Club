import { Request, Response } from 'express';
import LeaderboardsService from '../service/LeaderboardsService';

export default class LeaderboardsController {
  static async getLeaderboardHome(req: Request, res: Response) {
    const leaderboardsHome = await LeaderboardsService.getLeaderboardHome();

    return res.status(200).json(leaderboardsHome);
  }
}
