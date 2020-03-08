import * as Yup from 'yup';
import {
  RECIPIENT_NAME_REQUIRED,
  STREET_REQUIRED,
  NUMBER_REQUIRED,
  STATE_REQUIRED,
  CITY_REQUIRED,
  POSTCODE_REQUIRED,
} from '../../messages';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(RECIPIENT_NAME_REQUIRED),
    street: Yup.string().required(STREET_REQUIRED),
    number: Yup.string().required(NUMBER_REQUIRED),
    complement: Yup.string(),
    state: Yup.string().required(STATE_REQUIRED),
    city: Yup.string().required(CITY_REQUIRED),
    postCode: Yup.string().required(POSTCODE_REQUIRED),
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
