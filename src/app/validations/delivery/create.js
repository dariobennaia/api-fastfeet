import * as Yup from 'yup';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    product: Yup.string().required(),
    recipientId: Yup.number().required(),
    deliverymanId: Yup.number().required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(422).json({ error: 'Informe os dados!' });
  }

  return next();
};
