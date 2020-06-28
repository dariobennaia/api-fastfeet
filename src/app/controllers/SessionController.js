import jwt from 'jsonwebtoken';
import User from '../models/User';
import auth from '../../config/auth';
import { INVALID_AUTH } from '../messages';

class SessionController {
  /**
   * Gerando Token para usuário
   * @param {*} req
   * @param {*} res
   */
  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ err: INVALID_AUTH });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ err: INVALID_AUTH });
    }

    const { secrets, expiresIn } = auth;
    const { id, name } = user;
    const token = jwt.sign({ id }, secrets, { expiresIn });

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token,
    });
  }
}

export default new SessionController();
