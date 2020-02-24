import multer from 'multer';
import auth from '../../middlewares/auth';
import multerConfig from '../../../config/multer';

const files = multer(multerConfig);

const routes = [
  {
    method: 'post',
    route: '/files',
    middlewares: [files.single('file')],
    controller: (req, res) => res.json({ sucess: true }),
  },
];

const configs = {
  global: {
    middlewares: [auth],
  },
};

export default { routes, configs };
