import { Response, Request } from "express";
import { validationResponse } from "@/utils/validateResponse.helper";
import {
  responseSuccess,
  responseFailed,
  responseError,
} from "../../utils/response.helper";
import visaApplicationService from "@/services/visa-application/visa-application.service";
import eligibilityService from "@/services/visa-application/1stEligibilty.service";
import applicationInformationService from "@/services/visa-application/2ndApplyInformation.service";
import travelInformationService from "@/services/visa-application/3rdTravelInforamtion.service";

export const visaApplicationController = {
  async visaApplication(req: Request, res: Response) {
    try {
      const checkValid = validationResponse(req);
      if (checkValid) return checkValid;

      const userId = req.query.userId;
      if (!userId) return responseError({ res, message: "User ID is missing" });

      const result = await visaApplicationService(`${userId}`);
      if (!result)
        return responseFailed({ res, message: "Failed to create new application" });

      responseSuccess({ res, data: result, message: "successfully" });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },

  async firstStepEligibilty(req: Request, res: Response) {
    try {
      const checkValid = validationResponse(req);
      if (checkValid) return checkValid;
      const data = req.body;

      const { userId } = req.query;
      if (!userId) throw new Error("user ID param is missing");

      const result = await eligibilityService.create(`${userId}`, data);
      if (!result) return responseFailed({ res, message: "Failed to add Eligibilty" });

      return responseSuccess({ res, data: result, message: "successfully" });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },

  async secondStepApplicationInformation(req: Request, res: Response) {
    try {
      const checkValid = validationResponse(req);
      if (checkValid) return checkValid;
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

  async thirdStepTravelInformation(req: Request, res: Response) {
    try {
      const checkValid = validationResponse(req);
      if (checkValid) return checkValid;
      const data = req.body;
      const userId = req.query;

      const result = await travelInformationService(`${userId}`, data);
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

  async fourthStepSupportingDocument(req: Request, res: Response) {
    try {
      const checkValid = validationResponse(req);
      if (checkValid) return checkValid;
      const document = req.body;
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },
};
