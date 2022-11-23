import { Request, Response } from 'express';
import UserService from '../service/UserService';

export default class UserController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const { type, message } = await UserService.login(email, password);

    if (type) {
      return res.status(type).json({ message });
    }

    res.status(200).json({ token: message });
  }

  static async validate(req: Request, res: Response) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'token not provided' });
    }

    const userRole = await UserService.userRole(token);
    return res.status(200).json({ role: userRole });
  }
}
