import { Request, Response } from 'express';
import TeamsService from '../service/TeamsService';

export default class TeamsController {
  static async getAllteams(req: Request, res: Response) {
    const allTeams = await TeamsService.getAll();

    return res.status(200).json(allTeams);
  }

  static async getTeamsId(req: Request, res: Response) {
    const { id } = req.params;

    const teamId = await TeamsService.findById(Number(id));

    return res.status(200).json(teamId);
  }
}
