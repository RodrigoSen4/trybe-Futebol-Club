import * as bcrypt from 'bcryptjs';
import jwt = require('../utils/jwt.util');
import UserModel from '../database/models/UserModel';
import ErrorMap from '../utils/errorMap';
import IServiceUser from '../interface/IServiceUser';
/* import IUser from '../interface/IUser'; */

export default class UserService {
  static async login(email: string, password: string): Promise<IServiceUser> {
    if (!email || !password) {
      return { type: ErrorMap.BAD_REQUEST, message: 'All fields must be filled' };
    }

    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return { type: ErrorMap.UNAUTHORIZED, message: 'Incorrect email or password' };
    }

    const validPassEncripted = await bcrypt.compare(password, user.password);
    if (!validPassEncripted) {
      return { type: ErrorMap.UNAUTHORIZED, message: 'Incorrect email or password' };
    }

    const token = jwt.createToken(email);

    return { type: null, message: token };
  }

/*   static async validate(token: string): Promise<object> {
    const validToken = jwt.validateToken(token);
    const { role } = await UserModel.findOne({ where: { validToken } }) as unknown as IUser;
    return { role };
  } */
}
