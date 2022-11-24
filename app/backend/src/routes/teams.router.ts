import { Router } from 'express';
import TeamsController from '../controller/TeamsController';

const teamsRouter = Router();

teamsRouter.get('/', (req, res) => TeamsController.getAllteams(req, res));
teamsRouter.get('/:id', (req, res) => TeamsController.getTeamsId(req, res));

export default teamsRouter;
