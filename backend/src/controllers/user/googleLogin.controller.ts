import { Response, Request } from "express";
import { responseSuccess, responseFailed, responseError } from "@utils/response.helper";
import googleLoginService from "@/services/user/googleLogin.service";
import { appUrl } from "@/config/envLoader";
import { verify } from "@/utils/jwt";

const googleLoginController = {
  async login(req: Request, res: Response) {
    try {
      const login: any = await googleLoginService.login(req.token);
      if (!login)
        return responseFailed({
          res,
          data: [],
          message: "Login with Google failed",
        });

      const accessToken = login?.accessToken;
      res.cookie("session", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 5 * 60 * 1000,
        path: "/",
      });

      return res.redirect(`${appUrl}?user=${login.id}`);
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },

  async loginUrl(req: Request, res: Response) {
    try {
      const api = await googleLoginService.getLoginUrl();

      responseSuccess({ res, data: api });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },

  async loginCallBack(req: Request, res: Response) {
    try {
      const accessToken = req.cookies.session;

      console.log("\nRECEIVED FROM FROM END:", accessToken);

      if (!accessToken) return responseFailed({ res, message: "AccessToken no found" });
      const decode: any = verify(accessToken);

      console.log(decode);

      const email = decode.email;
      const user = await googleLoginService.loginCallBack(email);

      responseSuccess({ res, data: user });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },
};

export default googleLoginController;
