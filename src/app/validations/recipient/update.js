import * as Yup from 'yup';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string(),
    street: Yup.string(),
    number: Yup.string(),
    complement: Yup.string(),
    state: Yup.string(),
    city: Yup.string(),
    postCode: Yup.string(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(422).json({ error: 'Dados invalidos!' });
  }

  return next();
};
