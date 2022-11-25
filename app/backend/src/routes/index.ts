import { Router } from 'express';
import loginRoute from './login.router';
import teamsRouter from './teams.router';
import matchesRouter from './matches.router';

const router = Router();

router.use('/login', loginRoute);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);

export default router;
