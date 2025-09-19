import { Response, Request } from "express";
import { validationResponse } from "@/utils/validateResponse.helper";
import {
  responseSuccess,
  responseFailed,
  responseError,
} from "@/utils/response.helper";
import adminService from "@/services/admin/admin.service";
import { AdminDataDto } from "@/dto/admin.dto";
import { Document } from "@prisma/client";
import fs from "fs";

const adminController = {
  async getListCostumers(req: Request, res: Response) {
    try {
      const checkValid = validationResponse(req);
      if (checkValid) return responseFailed({ res, message: checkValid });

      const user = (req as any).user;
      const role = user.role;
      const id = user.id;
      const data = await adminService.getListCostumers(role, id);

      if (!data) responseFailed({ res });

      responseSuccess({ res, data });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },

  async getAllAdmin(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const role = user.role;
      const email = user.email;
      const data = await adminService.listAllAdmin(role, email);

      if (!data) responseFailed({ res });

      return responseSuccess({ res, data });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },

  async getOneCustomer(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const customerId = req.params.customerId;
      const data = await adminService.getOneCustomer(customerId, user);

      return responseSuccess({ res, data });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },
  async getOneApplication(req: Request, res: Response) {
    try {
      const admin: AdminDataDto = (req as any).user;
      const { applicationId } = req.params;

      const data = await adminService.getOneApplication(admin, applicationId);

      console.log(data);

      return responseSuccess({ res, data });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseSuccess({ res, message });
    }
  },
  async listApplicationsByCustomerId(req: Request, res: Response) {
    try {
      const admin: AdminDataDto = (req as any).user;
      const customerId = req.params.customerId;

      const data = await adminService.listAllApplicationsByCustomerId(
        customerId,
        admin
      );

      return responseSuccess({ res, data });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },
  async getSupportingDocument(req: Request, res: Response) {
    try {
      const admin: AdminDataDto = (req as any).user;
      const applicationId: any = req.query.applicationId;
      const field: any = String(req.query.field);

      if (!Object.values(Document).includes(field))
        return responseFailed({
          res,
          message: `Invalid supporting document field ${field}`,
        });

      const data = await adminService.getSupportingDocument(
        admin,
        applicationId,
        field
      );
      if (!data) return responseSuccess({ res, data });

      const absPath = data.storageKey;
      const fileSize = data.sizeBytes;
      res.setHeader("Accept-Ranges", "bytes");
      res.setHeader("Content-Length", fileSize);
      res.setHeader("Content-Type", data.mimeType);
      res.setHeader("X-Document-Field", field);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${data.originalName}"`
      );
      fs.createReadStream(absPath).pipe(res);
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },
};

export default adminController;
