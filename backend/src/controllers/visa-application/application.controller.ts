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
      const user = (req as any).user;

      const userId = String(req.query.userId);
      if (!userId) return responseError({ res, message: "User ID is missing" });

      const result = await visaApplicationService.listAll(userId, user);
      if (!result)
        return responseFailed({
          res,
          message: "Failed to create new application",
        });

      responseSuccess({ res, data: result, message: "successfully" });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },

  async deleteVisaApplicationByIds(req: Request, res: Response) {
    try {
      const userId = String(req.query.userId);
      if (!userId) return responseError({ res, message: "User ID is missing" });
      const ids = req.body.applicationIds;

      console.log(ids);

      const result = await visaApplicationService.deleteMany(ids);

      responseSuccess({ res, data: [], message: "successfully" });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },
};
