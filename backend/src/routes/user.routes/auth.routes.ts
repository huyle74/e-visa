import { Router } from 'express';
import loginController from '../../controllers/user.controller/auth.controller';
import { loginValidator } from '../../dto/auth.dto';

const loginRoute = Router();
loginRoute.post('/', loginValidator, loginController);

export default loginRoute;
