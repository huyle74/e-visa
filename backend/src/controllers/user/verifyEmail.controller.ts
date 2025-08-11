import { Request, Response } from 'express';
import verifyEmailService from '../../services/user-service/verifyEmail.service';
import {
  responseSuccess,
  responseError,
  responseFailed,
} from '../../utils/response.helper';

const verfiyEmailController = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    if (!token || typeof token !== 'string')
      return responseSuccess({ res, message: 'Token in missed' });

    const verify = await verifyEmailService(token);
    if (!verify)
      return responseFailed({ res, message: 'Cannot verify this Email' });

    return responseSuccess({ res, message: 'Verifed' });
  } catch (error: any) {
    console.error(error);
    responseError({ res, message: error.message });
  }
};

export default verfiyEmailController;
