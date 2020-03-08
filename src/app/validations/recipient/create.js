import * as Yup from 'yup';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required('Informe um nome.'),
    street: Yup.string().required('Informe um logradouro.'),
    number: Yup.string().required('Informe um número.'),
    complement: Yup.string(),
    state: Yup.string().required('Informe o estado.'),
    city: Yup.string().required('Informe a cidade.'),
    postCode: Yup.string().required('Informe o CEP.'),
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
