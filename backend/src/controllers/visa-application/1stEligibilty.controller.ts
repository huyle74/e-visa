import { Response, Request } from "express";
import { validationResponse } from "@/utils/validateResponse.helper";
import {
  responseError,
  responseFailed,
  responseSuccess,
} from "@/utils/response.helper";
import eligibilityService from "@/services/visa-application/1stEligibilty.service";

const eligibilityController = {
  async firstStepEligibilty(req: Request, res: Response) {
    try {
      const checkValid = validationResponse(req);
      if (checkValid) return responseFailed({ res, message: checkValid });
      const data = req.body;

      const { userId } = req.query;
      if (!userId) throw new Error("user ID param is missing");

      const user = (req as any).user;

      const result = await eligibilityService.create(user, `${userId}`, data);
      if (!result)
        return responseFailed({ res, message: "Failed to add Eligibilty" });

      return responseSuccess({ res, data: result, message: "successfully" });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },
  async findOne(req: Request, res: Response) {
    try {
      const { applicationId } = req.query;
      const data = await eligibilityService.findOne(String(applicationId));
      if (!data) return responseFailed({ res });

      return responseSuccess({ res, data });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },
};

export default eligibilityController;
