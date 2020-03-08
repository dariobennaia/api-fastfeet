import * as Yup from 'yup';
import File from '../../models/File';
import Deliveryman from '../../models/Deliveryman';
import {
  DELIVERYMAN_REQUIRED,
  SIGNATURE_REQUIRED,
  FILE_NOT_FOUND,
  DELIVERYMAN_NOT_FOUND,
} from '../../messages';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    deliverymanId: Yup.number()
      .required(DELIVERYMAN_REQUIRED)
      .test('has-deliveryman', DELIVERYMAN_NOT_FOUND, async value =>
        Deliveryman.findByPk(value)
      ),
    signatureId: Yup.number()
      .required(SIGNATURE_REQUIRED)
      .test('has-file', FILE_NOT_FOUND, async value => File.findByPk(value)),
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
