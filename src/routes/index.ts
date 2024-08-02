import { Router } from 'express';

import { auth } from './auth.routes';

const router: Router = Router();

const routes: {
  [key: string]: (router: Router) => void;
} = { auth };

for (const route in routes) {
  const nestedRouter = Router();
  routes[route](nestedRouter);
  router.use(`/api/${route}`, nestedRouter);
}

export { router };
