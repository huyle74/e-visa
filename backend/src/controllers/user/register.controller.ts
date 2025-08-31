import { Request, Response } from "express";
import { validationResponse } from "../../utils/validateResponse.helper";
import {
  responseSuccess,
  responseError,
  responseFailed,
} from "../../utils/response.helper";
import createAccountService from "../../services/user/register.service";

const createAccountController = async (req: Request, res: Response) => {
  try {
    const checkErrors = validationResponse(req);
    console.log(checkErrors);
    if (checkErrors) return responseFailed({ res, message: checkErrors });

    const createUser = await createAccountService(req.body);
    if (!createUser) return responseFailed({ res, message: "Cannot create account" });

    const { verifyToken, password, ...data } = createUser;

    return responseSuccess({
      res,
      data,
      message: "Create account successfully",
    });
  } catch (error: any) {
    console.error(error);
    responseError({ res, message: error?.message });
  }
};

export default createAccountController;
