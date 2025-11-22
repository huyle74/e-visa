import { Request, Response } from "express";
import verifyEmailService from "../../services/user/verifyEmail.service";
import {
  responseSuccess,
  responseError,
  responseFailed,
} from "../../utils/response.helper";

import { appUrl } from "@/config/envLoader";

const verifyEmailController = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    if (!token || typeof token !== "string")
      return responseFailed({ res, message: "Token in missed" });

    const email = req.query.email as string;
    if (!email) return responseFailed({ res, message: "Email not found" });

    const verify = await verifyEmailService(email);
    if (!verify)
      return responseFailed({ res, message: "Cannot verify this Email" });

    return res.redirect(appUrl);
  } catch (error: any) {
    console.error(error);
    responseError({ res, message: error.message });
  }
};

export default verifyEmailController;
