import { Router } from 'express';
import routes from './app/routes';

const router = Router();
routes.map(({ configs = {}, routes: routesModules = [] }) =>
  routesModules.map(
    ({ method, route, middlewares = [], noGlobals = [], controller }) => {
      let globals = [];

      if (configs.global && configs.global.middlewares) {
        globals = [...configs.global.middlewares];
      }

      if (noGlobals.length > 0) {
        noGlobals.forEach(fn => globals.splice(globals.indexOf(fn), 1));
      }

      return router[method](route, [...globals, ...middlewares], controller);
    }
  )
);

export default router;
