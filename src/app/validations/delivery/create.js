import * as Yup from 'yup';
import Recipient from '../../models/Recipient';
import Deliveriman from '../../models/Deliveryman';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    product: Yup.string().required('Informe o nome do produto.'),
    recipientId: Yup.number()
      .required('Informe o destinatario.')
      .test('has-recipient', 'Destinatario inexistente.', async value =>
        Recipient.findByPk(value)
      ),
    deliverymanId: Yup.number()
      .required('Informe o entregador.')
      .test('has-deliveryman', 'Entregador inexistente.', async value =>
        Deliveriman.findByPk(value)
      ),
    dateStart: Yup.mixed().test(
      'not-valid',
      'A data de inicio só pode ser informada quando o pedido for retirado',
      value => !value
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
