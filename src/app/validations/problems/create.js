import * as Yup from 'yup';
import Deliveryman from '../../models/Deliveryman';
import {
  PROBLEM_DESCRIPTION_REQUIRED,
  DELIVERYMAN_REQUIRED,
  DELIVERYMAN_NOT_FOUND,
} from '../../messages';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    description: Yup.string().required(PROBLEM_DESCRIPTION_REQUIRED),
    deliverymanId: Yup.number()
      .required(DELIVERYMAN_REQUIRED)
      .test('has-deliveryman', DELIVERYMAN_NOT_FOUND, async value =>
        Deliveryman.findByPk(value)
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
