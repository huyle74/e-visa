import { Response, Request } from "express";
import { validationResponse } from "@/utils/validateResponse.helper";
import loginService from "@/services/user/auth.service";
import { responseSuccess, responseFailed, responseError } from "@/utils/response.helper";
import { loginDto } from "@/dto/auth.dto";

const loginController = async (req: Request, res: Response) => {
  try {
    const checkValid = validationResponse(req);
    if (checkValid) return checkValid;

    const loginInfo: loginDto = req.body;
    const loginResponse = await loginService(loginInfo);

    if (!loginResponse) return responseFailed({ res, message: "Invalid credentials" });

    const { password, ...data } = loginResponse;

    return responseSuccess({ res, data, message: "Login successfully" });
  } catch (error: any) {
    console.error(error);
    const message = error?.message;
    return responseError({ res, message });
  }
};

export default loginController;
