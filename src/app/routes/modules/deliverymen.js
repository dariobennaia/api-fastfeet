import controller from '../../controllers/DeliverymanController';
import DeliveryStatusController from '../../controllers/DeliveryStatusController';
import validationCreate from '../../validations/deliveryman/create';
import validationUpdate from '../../validations/deliveryman/update';

import auth from '../../middlewares/auth';

const routes = [
  {
    method: 'get',
    route: '/deliverymen',
    controller: controller.index,
  },
  {
    method: 'get',
    route: '/deliverymen/:id',
    controller: controller.show,
  },
  {
    method: 'post',
    route: '/deliverymen',
    controller: controller.store,
    middlewares: [validationCreate],
  },
  {
    method: 'put',
    route: '/deliverymen/:id',
    controller: controller.update,
    middlewares: [validationUpdate],
  },
  {
    method: 'delete',
    route: '/deliverymen/:id',
    controller: controller.delete,
  },
  {
    method: 'get',
    route: '/deliverymen/:id/deliveries',
    controller: DeliveryStatusController.index,
    noGlobals: [auth],
  },
];

const configs = {
  global: {
    middlewares: [auth],
  },
};

export default { routes, configs };
