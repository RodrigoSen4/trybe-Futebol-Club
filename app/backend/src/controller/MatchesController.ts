import { Request, Response } from 'express';
import MatchesService from '../service/MatchesService';
import jwtUtil = require('../utils/jwt.util');

export default class MatchesController {
  static async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    const matches = await MatchesService.getAll(inProgress as string);

    return res.status(200).json(matches);
  }

  static async createMatches(req: Request, res: Response) {
    const { body } = req;
    const { authorization } = req.headers;

    const validateToken = jwtUtil.validateToken(authorization as string);

    if (!validateToken) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    const { type, message } = await MatchesService.createMatches(body);

    if (type) {
      return res.status(type).json({ message });
    }
    console.log(message);
    return res.status(201).json(message);
  }

  static async finishedMatche(req: Request, res: Response) {
    const { id } = req.params;
    const { message } = await MatchesService.finishedMatche(Number(id));

    return res.status(200).json(message);
  }

  static async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    const { message } = await MatchesService.updateMatch(Number(id), body);

    return res.status(200).json(message);
  }
}
