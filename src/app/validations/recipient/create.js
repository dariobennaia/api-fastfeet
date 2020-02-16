import * as Yup from 'yup';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    street: Yup.string().required(),
    number: Yup.string().required(),
    complement: Yup.string(),
    state: Yup.string().required(),
    city: Yup.string().required(),
    postCode: Yup.string().required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(422).json({ error: 'Informe os dados!' });
  }

  return next();
};
