import { Response, Request } from "express";
import { validationResponse } from "@/utils/validateResponse.helper";
import {
  responseSuccess,
  responseFailed,
  responseError,
} from "../../utils/response.helper";
import visaApplicationService from "@/services/visa-application/visa-application.service";
import applicationInformationService from "@/services/visa-application/2ndApplyInformation.service";
import travelInformationService from "@/services/visa-application/3rdTravelInforamtion.service";
import supportingDocumentService from "@/services/visa-application/4thSupportingDocument.service";

export const visaApplicationController = {
  async listVisaApplicationByUserId(req: Request, res: Response) {
    try {
      console.log("trigger");
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

  async thirdStepTravelInformation(req: Request, res: Response) {
    try {
      const checkValid = validationResponse(req);
      if (checkValid) return responseFailed({ res, message: checkValid });
      const data = req.body;
      const userId = req.query.userId;

      const result = await travelInformationService.create(`${userId}`, data);
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
