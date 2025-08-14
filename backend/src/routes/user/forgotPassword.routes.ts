import { Router } from 'express';
import { changePasswordValidator } from '../../dto/auth.dto';
import forgotPasswordController from '../../controllers/user/forgotPassword.controller';

const forgotPasswordRoute = Router();
forgotPasswordRoute.post(
  '/',
  changePasswordValidator,
  forgotPasswordController
);

export default forgotPasswordRoute;
