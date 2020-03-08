import * as Yup from 'yup';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    description: Yup.string().required('Informe a descrição do problema.'),
    deliverymanId: Yup.number().required('Informe o id do entregador.'),
  });

  try {
    await schema.validate(req.body, { stripUnknown: true, abortEarly: false });
    return next();
  } catch ({ inner }) {
    let validations = {};
    inner.forEach(({ path, message }) => {
      if (!validations[path]) {
        validations = { [path]: [message], ...validations };
      } else {
        validations[path].push(message);
      }
    });
    return res.status(422).json({ err: validations });
  }
};
