import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import auth from '../../config/auth';
import { INVALID_TOKEN } from '../messages';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ err: INVALID_TOKEN });
  }

  const [, token] = authHeader.split(' ');

  try {
    const user = await promisify(jwt.verify)(token, auth.secrets);
    req.userId = user.id;
    return next();
  } catch (err) {
    return res.status(401).json({ err: INVALID_TOKEN });
  }
};
