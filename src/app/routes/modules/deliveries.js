import controller from '../../controllers/DeliveryController';

import validationCreate from '../../validations/deliveryman/create';
import validationUpdate from '../../validations/deliveryman/update';

import auth from '../../middlewares/auth';

const routes = [
  {
    method: 'get',
    route: '/deliveries',
    controller: controller.index,
  },
  {
    method: 'get',
    route: '/deliveries/:id',
    controller: controller.show,
  },
  {
    method: 'post',
    route: '/deliveries',
    controller: controller.store,
    middlewares: [validationCreate],
  },
  {
    method: 'put',
    route: '/deliveries/:id',
    controller: controller.update,
    middlewares: [validationUpdate],
  },
  {
    method: 'delete',
    route: '/deliveries/:id',
    controller: controller.delete,
  },
];

const configs = {
  global: {
    middlewares: [auth],
  },
};

export default { routes, configs };
