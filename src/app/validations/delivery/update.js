import * as Yup from 'yup';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    product: Yup.string(),
    recipientId: Yup.number(),
    deliverymanId: Yup.number(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(422).json({ error: 'Informe os dados!' });
  }

  return next();
};
