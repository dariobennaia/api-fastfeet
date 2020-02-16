import { Router } from 'express';

import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import auth from './app/middlewares/auth';

import loginValidation from './app/validations/login';
import recipientCreate from './app/validations/recipient/create';
import recipientUpdate from './app/validations/recipient/update';

const routes = Router();
routes.post('/auth', loginValidation, SessionController.store);

routes.use(auth);
routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.post('/recipients', recipientCreate, RecipientController.store);
routes.put('/recipients/:id', recipientUpdate, RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

export default routes;
