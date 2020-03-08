import ProblemController from '../../controllers/ProblemController';

import auth from '../../middlewares/auth';

const routes = [
  {
    method: 'get',
    route: '/problems',
    controller: ProblemController.index,
  },
  {
    method: 'delete',
    route: '/problems/:id/cancel-delivery',
    controller: ProblemController.delete,
  },
];

const configs = {
  global: {
    middlewares: [auth],
  },
};

export default { routes, configs };
