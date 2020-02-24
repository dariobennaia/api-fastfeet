import controller from '../../controllers/SessionController';

import validation from '../../validations/login';

const routes = [
  {
    method: 'post',
    route: '/auth',
    controller: controller.store,
    middlewares: [validation],
  },
];

export default { routes };
