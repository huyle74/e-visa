import { Response, Request } from "express";

import { responseSuccess, responseFailed, responseError } from "@/utils/response.helper";
import guardService from "@/services/user/guard.service";

const guardController = async (req: Request, res: Response) => {
  try {
    const checkValid = await guardService(req.body.accessToken);
    if (!checkValid) return responseFailed({ res });

    responseSuccess({ res });
  } catch (error: any) {
    console.error(error);
    const message = error?.message;
    return responseError({ res, message });
  }
};

export default guardController;
