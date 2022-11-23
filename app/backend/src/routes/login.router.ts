import { Router } from 'express';
import UserController from '../controller/UserController';

const loginRoute = Router();

loginRoute.post('/', (req, res) => UserController.login(req, res));
/* loginRoute.get('/validate', (req, res) => UserController.validate(req, res)); */

export default loginRoute;
