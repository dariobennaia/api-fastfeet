import * as Yup from 'yup';
import { AUTH_REQUIRED } from '../messages';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string().required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(422).json({ err: AUTH_REQUIRED });
  }

  return next();
};
