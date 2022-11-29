import { Router } from 'express';
import LeaderboardsController from '../controller/LeaderboardsController';

const leaderboardsRoute = Router();

leaderboardsRoute.get('/home', (req, res) => LeaderboardsController.getLeaderboardHome(req, res));

export default leaderboardsRoute;
