import { Router } from "express";
import adminController from "@/controllers/admin/admin.controller";

const applicationRoute = Router({ mergeParams: true });
const supportingDocumentRoute = Router({ mergeParams: true });

applicationRoute.use("/supporting-document", supportingDocumentRoute);

applicationRoute.get("/list", adminController.getAllAdmin);
applicationRoute.get("/:applicationId", adminController.getOneApplication);
applicationRoute.get(
  "/customer/:customerId",
  adminController.listApplicationsByCustomerId
);
supportingDocumentRoute.get(
  "/",
  adminController.getSupportingDocument
);

export default applicationRoute;
