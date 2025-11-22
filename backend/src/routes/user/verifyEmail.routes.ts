import { Router } from 'express';
import verifyEmailController from '../../controllers/user/verifyEmail.controller';

const verifyEmailRoute = Router();
verifyEmailRoute.get('/', verifyEmailController);

export default verifyEmailRoute;
