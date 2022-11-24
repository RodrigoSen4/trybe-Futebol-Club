import { Router } from 'express';
import loginRoute from './login.router';
import teamsRouter from './teams.router';

const router = Router();

router.use('/login', loginRoute);
router.use('/teams', teamsRouter);

export default router;
