import { Request, Response } from "express";
import { validationResponse } from "../../utils/validateResponse.helper";
import {
  responseSuccess,
  responseError,
  responseFailed,
} from "../../utils/response.helper";
import forgotPasswordService from "../../services/user/forgotPassword.service";

const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const error = validationResponse(req);
    if (error) return responseFailed({ res, message: error });

    const updatePassword = await forgotPasswordService(req.body);
    if (!updatePassword)
      return responseFailed({ res, message: "Failed to create new Password" });

    const { verifyToken, password, ...user } = updatePassword;

    return responseSuccess({
      res,
      data: user,
      message: "Create new password successfully",
    });
  } catch (error: any) {
    console.log(error.message);
    responseError({ res, message: error.message });
  }
};

export default forgotPasswordController;
