import * as Yup from 'yup';
import File from '../../models/File';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required('Informe o nome.'),
    avatarId: Yup.number()
      .required('Informe o avatar.')
      .test('has-recipient', 'Arquivo inexistente.', async value =>
        File.findByPk(value)
      ),
    email: Yup.string()
      .email('E-mail inválido.')
      .required('Informe um E-mail.'),
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
