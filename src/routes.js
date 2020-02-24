import { Router } from 'express';
import routes from './app/routes';

const router = Router();
routes.map(({ configs = {}, routes: routesModules = [] }) => {
  if (configs.global && configs.global.middlewares) {
    configs.global.middlewares.map(middleware => router.use(middleware));
  }

  return routesModules.map(({ method, route, middlewares = [], controller }) =>
    router[method](route, middlewares, controller)
  );
});

export default router;
