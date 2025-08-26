import { Router, Response, Request, NextFunction } from "express";
import { visaApplicationController } from "@/controllers/visa-application/application.controller";
import {
  eligibiltyValidator,
  applicationInformationValidator,
  supportingDocumentValidator,
  travelInformationValidator,
} from "@/dto/visaApply/validator.dto";
import multer from "multer";
import { responseFailed } from "@/utils/response.helper";
import { uploadDisk } from "@/config/multer";

const applicationRouter = Router();

applicationRouter.post(
  "/list-visa-application",
  visaApplicationController.listVisaApplicationByUserId
);
applicationRouter.post(
  "/1st-eligibilty",
  eligibiltyValidator,
  visaApplicationController.firstStepEligibilty
);
applicationRouter.post(
  "/2nd-applicationInformation",
  applicationInformationValidator,
  visaApplicationController.secondStepApplicationInformation
);
applicationRouter.post(
  "/3rd-travelInformation",
  travelInformationValidator,
  visaApplicationController.thirdStepTravelInformation
);
applicationRouter.post(
  "/4th-supportingDocument",
  uploadDisk.fields([
    { name: "BIODATA", maxCount: 1 },
    { name: "PHOTOGRAPH", maxCount: 1 },
    { name: "CURRENT_LOCATION", maxCount: 1 },
    { name: "BOOKING_CONFIRMATION", maxCount: 1 },
    { name: "PROOF_OF_ACCOMMODATION", maxCount: 1 },
    { name: "FINANCIAL_EVIDENCE", maxCount: 1 },
  ]),
  (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return responseFailed({ res, message: `${err.field} Files Exceed 3MB` });
      }
    }
    next(req);
  },
  supportingDocumentValidator,
  visaApplicationController.fourthStepSupportingDocument
);

export default applicationRouter;
