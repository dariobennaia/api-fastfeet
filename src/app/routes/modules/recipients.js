import controller from '../../controllers/RecipientController';

import recipientCreate from '../../validations/recipient/create';
import recipientUpdate from '../../validations/recipient/update';

import auth from '../../middlewares/auth';

const routes = [
  {
    method: 'get',
    route: '/recipients',
    controller: controller.index,
  },
  {
    method: 'get',
    route: '/recipients/:id',
    controller: controller.show,
  },
  {
    method: 'post',
    route: '/recipients',
    controller: controller.store,
    middlewares: [recipientCreate],
  },
  {
    method: 'put',
    route: '/recipients/:id',
    controller: controller.update,
    middlewares: [recipientUpdate],
  },
  {
    method: 'delete',
    route: '/recipients/:id',
    controller: controller.delete,
  },
];

const configs = {
  global: {
    middlewares: [auth],
  },
};

export default { routes, configs };
