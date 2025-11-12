import { Request, Response } from "express";
import {
  responseSuccess,
  responseFailed,
  responseError,
} from "../../utils/response.helper";
import paypalService from "@/services/paypal/paypal.service";

const paypalController = {
  async createOrder(req: Request, res: Response) {
    try {
      const data = req.body;
      const checkout = await paypalService.createOrder(data);
      if (!checkout) return responseFailed({ res });

      responseSuccess({ res, data: checkout });
    } catch (error: any) {
      console.error(error);
      responseError({ res, message: "Server got error!" });
    }
  },
  async captureOrder(req: Request, res: Response) {
    try {
      const { orderId, applicationId } = req.body;
      const capture = await paypalService.captureOrder(orderId, applicationId);
      if (!capture) return responseFailed({ res });

      responseSuccess({ res, data: capture });
    } catch (error: any) {
      console.error(error);
      responseError({ res, message: "Server got error!" });
    }
  },
};

export default paypalController;
