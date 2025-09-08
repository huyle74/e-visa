import { Router } from "express";
import googleLoginController from "@/controllers/user/googleLogin.controller";
import googleLoginMiddleWare from "@/middleware/googleLogin.middleware";

const googleLoginRoute = Router();
googleLoginRoute.get("/", googleLoginMiddleWare, googleLoginController.login);
googleLoginRoute.get("/login-url", googleLoginController.loginUrl);
googleLoginRoute.post("/login-callback", googleLoginController.loginCallBack);

export default googleLoginRoute;
