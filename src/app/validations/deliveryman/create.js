import * as Yup from 'yup';
import File from '../../models/File';
import {
  DELIVERYMAN_NAME_REQUIRED,
  AVATAR_REQUIRED,
  FILE_NOT_FOUND,
  INVALID_MAIL,
  MAIL_REQUIRED,
} from '../../messages';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(DELIVERYMAN_NAME_REQUIRED),
    avatarId: Yup.number()
      .required(AVATAR_REQUIRED)
      .test('has-recipient', FILE_NOT_FOUND, async value =>
        File.findByPk(value)
      ),
    email: Yup.string()
      .email(INVALID_MAIL)
      .required(MAIL_REQUIRED),
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
