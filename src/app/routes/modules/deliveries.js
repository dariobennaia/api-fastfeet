import controller from '../../controllers/DeliveryController';
import startDeliveryController from '../../controllers/StartDeliveryController';
import finishDeliveryController from '../../controllers/FinishDeliveryController';
import DeliveryProblemController from '../../controllers/DeliveryProblemController';
import ProblemController from '../../controllers/ProblemController';

import validationCreate from '../../validations/delivery/create';
import validationUpdate from '../../validations/delivery/update';

import startDeliveryValidation from '../../validations/startDelivery/update';
import finishDeliveryValidation from '../../validations/finishDelivery/update';
import createProblemValidation from '../../validations/problems/create';

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
  {
    method: 'put',
    route: '/deliveries/:id/start',
    controller: startDeliveryController.update,
    middlewares: [startDeliveryValidation],
  },
  {
    method: 'put',
    route: '/deliveries/:id/finish',
    controller: finishDeliveryController.update,
    middlewares: [finishDeliveryValidation],
  },
  {
    method: 'get',
    route: '/deliveries/:id/problems',
    controller: DeliveryProblemController.show,
  },
  {
    method: 'post',
    route: '/deliveries/:id/problems',
    controller: ProblemController.store,
    middlewares: [createProblemValidation],
  },
];

const configs = {
  global: {
    middlewares: [auth],
  },
};

export default { routes, configs };
