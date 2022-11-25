import { Request, Response } from 'express';
import MatchesService from '../service/MatchesService';

export default class MatchesController {
  static async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    const matches = await MatchesService.getAll(inProgress as string);

    return res.status(200).json(matches);
  }
}
