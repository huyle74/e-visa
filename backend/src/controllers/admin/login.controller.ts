import { Response, Request } from "express";
import { validationResponse } from "@/utils/validateResponse.helper";
import {
  responseSuccess,
  responseFailed,
  responseError,
} from "@/utils/response.helper";
import {
  CreateAdminAccountDto,
  loginDto,
  ReCreatePassordDto,
} from "@/dto/auth.dto";
import adminLoginService from "@/services/admin/login.service";

const adminLoginController = {
  async login(req: Request, res: Response) {
    try {
      const checkValid = validationResponse(req);
      if (checkValid) return responseFailed({ res, message: checkValid });

      const loginInfo: loginDto = req.body;
      const result = await adminLoginService.login(loginInfo);

      responseSuccess({ res, data: result });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },
  async forgotPassword(req: Request, res: Response) {
    try {
      const checkValid = validationResponse(req);
      if (checkValid) return responseFailed({ res, message: checkValid });

      const reCreatePassword: ReCreatePassordDto = req.body;
      const data = await adminLoginService.createNewpassword(reCreatePassword);

      console.log(data);

      responseSuccess({ res, data });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },
  async createAdminAccount(req: Request, res: Response) {
    try {
      const checkValid = validationResponse(req);
      if (checkValid) return responseFailed({ res, message: checkValid });

      const accountData: CreateAdminAccountDto = req.body;

      const data = await adminLoginService.createAccount(accountData);
      if (!data)
        responseFailed({ res, message: "Failed to create new admin account" });

      responseSuccess({ res, data });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },
};

export default adminLoginController;
