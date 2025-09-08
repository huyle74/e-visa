import { Response, Request } from "express";
import {
  responseSuccess,
  responseFailed,
  responseError,
} from "../../utils/response.helper";
import visaApplicationService from "@/services/visa-application/visa-application.service";

export const visaApplicationController = {
  async listVisaApplicationByUserId(req: Request, res: Response) {
    try {
      console.log("trigger");
      const user = (req as any).user;

      const userId = String(req.query.userId);
      if (!userId) return responseError({ res, message: "User ID is missing" });

      const result = await visaApplicationService(userId, user);
      if (!result)
        return responseFailed({ res, message: "Failed to create new application" });

      responseSuccess({ res, data: result, message: "successfully" });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },
};
