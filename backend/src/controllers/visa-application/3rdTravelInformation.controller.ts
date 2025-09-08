import { Response, Request } from "express";
import { validationResponse } from "@/utils/validateResponse.helper";
import { responseError, responseFailed, responseSuccess } from "@/utils/response.helper";
import travelInformationService from "@/services/visa-application/3rdTravelInforamtion.service";

export const travelInformationController = {
  async thirdStepTravelInformation(req: Request, res: Response) {
    try {
      const checkValid = validationResponse(req);
      if (checkValid) return responseFailed({ res, message: checkValid });
      const data = req.body;
      const userId = String(req.query.userId);

      const result = await travelInformationService.create(userId, data);
      if (!result)
        return responseFailed({ res, message: "Failed to add travel information" });
      console.log(result);

      return responseSuccess({ res, data: result });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },
  async findOne(req: Request, res: Response) {
    try {
      const applicationId = String(req.query.applicationId);
      const data = await travelInformationService.findOne(applicationId);
      if (!data) return responseFailed({ res });

      return responseSuccess({ res, data });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },
};
