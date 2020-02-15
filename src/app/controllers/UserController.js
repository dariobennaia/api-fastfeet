import User from '../models/User';

class UserController {
  async index(req, res) {
    const users = await User.findAll();
    res.json(users);
  }

  async store(req, res) {
    const { body } = req;

    const userExists = await User.findOne({ where: { email: body.email } });
    if (userExists) {
      res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    const { name, email, password_hash } = await User.create(body);
    res.status(201).json({
      name,
      email,
      password_hash,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);
    if (email && user.email !== email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'E-mail já cadastrado' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(400).json({ error: 'Senha atual invalida!' });
    }

    await user.update(req.body);
    return res.json(req.body);
  }
}

export default new UserController();
