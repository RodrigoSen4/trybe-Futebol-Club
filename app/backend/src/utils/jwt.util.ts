import * as jwt from 'jsonwebtoken';

require('dotenv/config');

const secret: jwt.Secret = process.env.JWT_SECRET as string;

const createToken = (data: string) => {
  const token = jwt.sign({ data }, secret, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
};

const validateToken = (token: string) => {
  const decoded = jwt.decode(token);
  return decoded as jwt.JwtPayload;
};

export = {
  createToken,
  validateToken,
};
