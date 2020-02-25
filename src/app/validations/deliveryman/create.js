import * as Yup from 'yup';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    avatar_id: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(422).json({ error: 'Informe os dados!' });
  }

  return next();
};
