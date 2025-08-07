import { Router } from 'express';
import loginRoute from './user.routes/auth.routes';
import createAccountRoute from './user.routes/register.routes';
import verifyEmailRoute from './user.routes/verifyEmail.routes';
import forgotPasswordRoute from './user.routes/forgotPassword.routes';

const routes = Router();

routes.use('/login', loginRoute);
routes.use('/create-account', createAccountRoute);
routes.use('/verify-email', verifyEmailRoute);
routes.use('/forgot-password', forgotPasswordRoute);

export default routes;
