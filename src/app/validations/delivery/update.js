import * as Yup from 'yup';
import Recipient from '../../models/Recipient';
import Deliveryman from '../../models/Deliveryman';
import { RECIPIENT_NOT_FOUND, DELIVERYMAN_NOT_FOUND } from '../../messages';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    product: Yup.string(),
    recipientId: Yup.number().test(
      'has-recipient',
      RECIPIENT_NOT_FOUND,
      async value => Recipient.findByPk(value)
    ),
    deliverymanId: Yup.number().test(
      'has-deliveryman',
      DELIVERYMAN_NOT_FOUND,
      async value => Deliveryman.findByPk(value)
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
