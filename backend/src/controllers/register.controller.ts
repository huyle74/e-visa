import { Request, Response } from 'express';
import { validationResponse } from '../utils/validateResponse.helper';
import {
  responseSuccess,
  responseError,
  responseFailed,
} from '../utils/response.helper';
import createAccountService from '../services/register.service';

const createAccountController = async (req: Request, res: Response) => {
  try {
    console.log('---call create account---');
    const checkErrors = validationResponse(req);
    if (checkErrors) return responseFailed({ res, message: checkErrors });

    const createUser = await createAccountService(req.body);
    if (!createUser)
      return responseFailed({ res, message: 'Cannot create account' });

    const { password, ...data } = createUser;

    return responseSuccess({
      res,
      data,
      message: 'Create account successfully',
    });
  } catch (error: any) {
    console.error(error);
    responseError({ res, message: error?.message });
  }
};

export default createAccountController;
