import { Response, Request } from 'express';
import {
  responseSuccess,
  responseFailed,
  responseError,
} from '../../utils/response.helper';
import googleLoginService from '../../services/user/googleLogin.service';

const googleLoginController = async (req: Request, res: Response) => {
  try {
    const login = await googleLoginService(req.token);
    if (!login)
      return responseFailed({
        res,
        data: [],
        message: 'Login with Google failed',
      });

    return responseSuccess({
      res,
      data: login,
      message: 'Login Successfully',
    });
  } catch (error: any) {
    console.error(error);
    const message = error?.message;
    return responseError({ res, message });
  }
};

export default googleLoginController;
