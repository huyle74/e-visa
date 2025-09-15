import { Router, Response, Request, NextFunction } from "express";
import { visaApplicationController } from "@/controllers/visa-application/application.controller";
import {
  eligibiltyValidator,
  applicationInformationValidator,
  travelInformationValidator,
  supportingDocumentValidator,
} from "@/dto/visaApply/validator.dto";
import eligibilityController from "@/controllers/visa-application/1stEligibilty.controller";
import { applicationInformationController } from "@/controllers/visa-application/2ndApplicationInformation.controller";
import { travelInformationController } from "@/controllers/visa-application/3rdTravelInformation.controller";
import supportingDocumentController from "@/controllers/visa-application/4thSupportingDocument.controller";
import multer from "multer";
import { responseFailed } from "@/utils/response.helper";
import { receiveFiles } from "@/config/multer";

const applicationRouter = Router();

applicationRouter.get(
  "/list-visa-application",
  visaApplicationController.listVisaApplicationByUserId
);
applicationRouter.post(
  "/delete-application-by-ids",
  visaApplicationController.deleteVisaApplicationByIds
);
applicationRouter.post(
  "/find-visa-application",
  visaApplicationController.getVisaApplicationById
);

// 1ST
applicationRouter.post(
  "/1st-eligibilty",
  eligibiltyValidator,
  eligibilityController.firstStepEligibilty
);
applicationRouter.post("/find-eligibilty-form", eligibilityController.findOne);

// 2nd application Information
applicationRouter.post(
  "/2nd-applicationInformation",
  receiveFiles.fields([
    { name: "biodata", maxCount: 1 },
    { name: "photograph", maxCount: 1 },
  ]),
  (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return responseFailed({
          res,
          message: `${err.field} Files Exceed 5MB`,
        });
      }
    }
    next(req);
  },
  applicationInformationValidator,
  applicationInformationController.secondStepApplicationInformation
);
applicationRouter.post(
  "/find-application-information-form",
  applicationInformationController.findOne
);

// 3rd travelInformation
applicationRouter.post(
  "/3rd-travelInformation",
  travelInformationValidator,
  travelInformationController.thirdStepTravelInformation
);
applicationRouter.post(
  "/find-travel-information-form",
  travelInformationController.findOne
);

// 4th supporting Document
applicationRouter.post(
  "/4th-supportingDocument",
  receiveFiles.fields([
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
        return responseFailed({
          res,
          message: `${err.field} Files Exceed 5MB`,
        });
      }
    }
    next(req);
  },
  supportingDocumentValidator,
  supportingDocumentController.fourthStepSupportingDocument
);
applicationRouter.post(
  "/get-file-supporting-document",
  supportingDocumentController.getFile
);

export default applicationRouter;
