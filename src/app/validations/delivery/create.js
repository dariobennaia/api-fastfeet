import * as Yup from 'yup';
import Recipient from '../../models/Recipient';
import Deliveryman from '../../models/Deliveryman';
import {
  PRODUCT_REQUIRED,
  RECIPIENT_REQUIRED,
  RECIPIENT_NOT_FOUND,
  DELIVERYMAN_REQUIRED,
  DELIVERYMAN_NOT_FOUND,
  DATE_START_NOT_VALID,
} from '../../messages';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    product: Yup.string().required(PRODUCT_REQUIRED),
    recipientId: Yup.number()
      .required(RECIPIENT_REQUIRED)
      .test('has-recipient', RECIPIENT_NOT_FOUND, async value =>
        Recipient.findByPk(value)
      ),
    deliverymanId: Yup.number()
      .required(DELIVERYMAN_REQUIRED)
      .test('has-deliveryman', DELIVERYMAN_NOT_FOUND, async value =>
        Deliveryman.findByPk(value)
      ),
    dateStart: Yup.mixed().test(
      'not-valid',
      DATE_START_NOT_VALID,
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
