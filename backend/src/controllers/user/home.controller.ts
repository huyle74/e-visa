import { Request, Response } from "express";
import {
  responseSuccess,
  responseError,
  responseFailed,
} from "@/utils/response.helper";
import userHomeService from "@/services/user/main.service";

const userHomeController = {
  async homePage(req: Request, res: Response) {
    try {
      const user = (req as any).user;

      const { data } = await userHomeService.homePage(user?.id);
      if (!data) return responseFailed({ res, message: "Failed to get data" });

      return responseSuccess({ res, data });
    } catch (error) {
      console.error(error);
      responseError({ res });
    }
  },
};

export default userHomeController;
