import jwt from 'jsonwebtoken';
import User from '../models/User';
import auth from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'É-mail ou senha inválidos!' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'É-mail ou senha inválidos!' });
    }

    const { secrets, expiresIn } = auth;
    const { id } = user;
    const token = jwt.sign({ id }, secrets, { expiresIn });

    return res.json(token);
  }
}

export default new SessionController();
