import { Router } from 'express';
import verfiyEmailController from '../../controllers/user/verifyEmail.controller';

const verifyEmailRoute = Router();
verifyEmailRoute.get('/', verfiyEmailController);

export default verifyEmailRoute;
