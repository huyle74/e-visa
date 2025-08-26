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
import supportingDocumentService from "@/services/visa-application/4thSupportingDocument.service";

export const visaApplicationController = {
  async listVisaApplicationByUserId(req: Request, res: Response) {
    try {
      const checkValid = validationResponse(req);
      if (checkValid) return responseFailed({ res, message: checkValid });

      const user = (req as any).user;

      const userId = req.query.userId;
      if (!userId) return responseError({ res, message: "User ID is missing" });

      const result = await visaApplicationService(`${userId}`, user);
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
      if (checkValid) return responseFailed({ res, message: checkValid });
      const data = req.body;

      const { userId } = req.query;
      if (!userId) throw new Error("user ID param is missing");

      const user = (req as any).user;

      const result = await eligibilityService.create(user, `${userId}`, data);
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

  async thirdStepTravelInformation(req: Request, res: Response) {
    try {
      const checkValid = validationResponse(req);
      if (checkValid) return responseFailed({ res, message: checkValid });
      const data = req.body;
      const userId = req.query.userId;

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
      if (checkValid) return responseFailed({ res, message: checkValid });

      console.log((req as any).user);

      const userId = req.query.userId;
      const { applicationId } = req.body;

      const document = req.files as Express.Multer.File[];
      const result = await supportingDocumentService(
        `${userId}`,
        document,
        applicationId
      );
      if (!result)
        return responseFailed({ res, message: "Cannot add supporting document" });

      return responseSuccess({ res, data: result });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },
};
