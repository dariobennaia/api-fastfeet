import * as Yup from 'yup';
import File from '../../models/File';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    deliverymanId: Yup.number().required('Informe o entregador.'),
    signatureId: Yup.number()
      .required('Informe a assinatura.')
      .test('has-file', 'Arquivo inexistente.', async value =>
        File.findByPk(value)
      ),
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
