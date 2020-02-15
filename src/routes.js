import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import auth from './app/middlewares/auth';

import loginValidation from './app/validations/login';

const routes = Router();
routes.post('/auth', loginValidation, SessionController.store);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.use(auth);

routes.put('/users', UserController.update);
export default routes;
