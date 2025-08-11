import { Router } from 'express';
import createAccountController from '../../controllers/user/register.controller';
import { createAccountValidator } from '../../dto/auth.dto';

const createAccountRoute = Router();
createAccountRoute.post('/', createAccountValidator, createAccountController);

export default createAccountRoute;
