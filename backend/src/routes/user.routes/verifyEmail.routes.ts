import { Router } from 'express';
import verfiyEmailController from '../../controllers/user.controller/verifyEmail.controller';

const verifyEmailRoute = Router();
verifyEmailRoute.get('/', verfiyEmailController);

export default verifyEmailRoute;
