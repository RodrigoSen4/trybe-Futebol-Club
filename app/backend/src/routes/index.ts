import { Router } from 'express';
import loginRoute from './login.router';
import teamsRouter from './teams.router';
import matchesRouter from './matches.router';
import leaderboardsRoute from './leaderboard';

const router = Router();

router.use('/login', loginRoute);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderboardsRoute);

export default router;
