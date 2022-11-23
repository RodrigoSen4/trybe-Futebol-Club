import jwt = require('jsonwebtoken');

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
  const validToken = jwt.verify(token, secret);
  return validToken;
};

export = {
  createToken,
  validateToken,
};
