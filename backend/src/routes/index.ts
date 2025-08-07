import { Router } from 'express';
import loginRoute from './auth.routes';
import createAccountRoute from './register.routes';

const routes = Router();

routes.use('/login', loginRoute);
routes.use('/create-account', createAccountRoute);

export default routes;
