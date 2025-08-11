import { Router } from 'express';
import googleLoginController from '../../controllers/user/googleLogin.controller';
import googleLoginMiddleWare from '../../middleware/googleLogin.middleware';

const googleLoginRoute = Router();
googleLoginRoute.post('/', googleLoginMiddleWare, googleLoginController);

export default googleLoginRoute;
