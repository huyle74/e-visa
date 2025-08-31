import { Response, Request } from "express";
import { validationResponse } from "@/utils/validateResponse.helper";
import { responseError, responseFailed, responseSuccess } from "@/utils/response.helper";
import applicationInformationService from "@/services/visa-application/2ndApplyInformation.service";

export const applicationInformationController = {
  async secondStepApplicationInformation(req: Request, res: Response) {
    try {
      const checkValid = validationResponse(req);
      if (checkValid) return responseFailed({ res, message: checkValid });

      const data = req.body;
      const userId = req.query.userId;

      console.log(data);

      const result = await applicationInformationService.create(data, `${userId}`);
      if (!result)
        return responseFailed({ res, message: "Failed to add application information" });

      return responseSuccess({ res, data: result });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },

  async findOne(req: Request, res: Response) {
    try {
      const { applicationId } = req.body;
      console.log(applicationId);
      const data = await applicationInformationService.findOne(applicationId);
      if (!data) return responseFailed({ res });

      return responseSuccess({ res, data });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },
};
