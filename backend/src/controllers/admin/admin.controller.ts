import { Response, Request } from "express";
import { validationResponse } from "@/utils/validateResponse.helper";
import {
  responseSuccess,
  responseFailed,
  responseError,
} from "@/utils/response.helper";
import adminService from "@/services/admin/admin.service";

const adminController = {
  async getUserData(req: Request, res: Response) {
    try {
      const checkValid = validationResponse(req);
      if (checkValid) return responseFailed({ res, message: checkValid });

      const user = (req as any).user;
      const role = user.role;
      const id = user.id;
      console.log(role, id);
      const data = await adminService.getUserData(role, id);

      if (!data) responseFailed({ res });

      responseSuccess({ res, data });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },
};

export default adminController;
