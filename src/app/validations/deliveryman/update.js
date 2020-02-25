import * as Yup from 'yup';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string(),
    avatarId: Yup.number(),
    email: Yup.string().email(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(422).json({ error: 'Dados invalidos!' });
  }

  return next();
};
