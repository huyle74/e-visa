import { Response, Request } from "express";
import { validationResponse } from "@/utils/validateResponse.helper";
import { responseError, responseFailed, responseSuccess } from "@/utils/response.helper";
import supportingDocumentService from "@/services/visa-application/4thSupportingDocument.service";
import path from "path";
import fs from "fs";
import mime from "mime";

const supportingDocumentController = {
  async fourthStepSupportingDocument(req: Request, res: Response) {
    try {
      const checkValid = validationResponse(req);
      if (checkValid) return responseFailed({ res, message: checkValid });

      const userId = String(req.query.userId);
      const applicationId = String(req.query.applicationId);

      const document = req.files as Express.Multer.File[];

      const result = await supportingDocumentService.create(
        userId,
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

  async getFile(req: Request, res: Response) {
    try {
      const { applicationId, type } = req.query;

      const file = await supportingDocumentService.getFile(String(applicationId), type);
      const absPath = file.storageKey;
      const contentType = file.mimeType;

      res.setHeader("Content-Type", contentType);
      res.setHeader("X-File-Name", file.originalName);

      fs.createReadStream(absPath).pipe(res);
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },
};

export default supportingDocumentController;
