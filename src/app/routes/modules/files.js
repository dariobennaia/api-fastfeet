import multer from 'multer';
import auth from '../../middlewares/auth';
import multerConfig from '../../../config/multer';
import controller from '../../controllers/FileController';

const files = multer(multerConfig);

const routes = [
  {
    method: 'post',
    route: '/files',
    middlewares: [files.single('file')],
    controller: controller.store,
  },
];

const configs = {
  global: {
    middlewares: [auth],
  },
};

export default { routes, configs };
