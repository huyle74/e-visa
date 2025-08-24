import { Router } from "express";
import { visaApplicationController } from "@/controllers/visa-application/application.controller";
import {
  eligibiltyValidator,
  validateApplicationInfo,
} from "@/dto/visaApply/validator.dto";

const applicationRouter = Router();

applicationRouter.post(
  "/new-visa-application",
  visaApplicationController.visaApplication
);
applicationRouter.post(
  "/1st-eligibilty",
  eligibiltyValidator,
  visaApplicationController.firstStepEligibilty
);
applicationRouter.post(
  "/2nd-applicationInformation",
  validateApplicationInfo,
  visaApplicationController.secondStepApplicationInformation
);
applicationRouter.post(
  "/3rd-travelInformation",
  visaApplicationController.thirdStepTravelInformation
);
applicationRouter.post(
  "/4th-supportingDocument",
  visaApplicationController.fourthStepSupportingDocument
);

export default applicationRouter;
