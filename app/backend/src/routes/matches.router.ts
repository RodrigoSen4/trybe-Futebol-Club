import { Router } from 'express';
import MatchesController from '../controller/MatchesController';

const matchesRouter = Router();

matchesRouter.get('/', (req, res) => MatchesController.getAllMatches(req, res));
matchesRouter.post('/', (req, res) => MatchesController.createMatches(req, res));
matchesRouter
  .patch('/:id/finish', (req, res) => MatchesController.finishedMatche(req, res));

export default matchesRouter;
