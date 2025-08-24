import { Router } from "express";
import loginRoute from "./user/auth.routes";
import createAccountRoute from "./user/register.routes";
import verifyEmailRoute from "./user/verifyEmail.routes";
import forgotPasswordRoute from "./user/forgotPassword.routes";
import googleLoginRoute from "./user/googleLogin.routes";
import paypalRoute from "./paypal/paypal.routes";
import staticRoutes from "./static/static.routes";
import applicationRouter from "./visa-application/allApplicationStep.routes";

const routes = Router();

routes.use("/login", loginRoute);
routes.use("/create-account", createAccountRoute);
routes.use("/verify-email", verifyEmailRoute);
routes.use("/forgot-password", forgotPasswordRoute);
routes.use("/login-google", googleLoginRoute);
routes.use("/payment", paypalRoute);
routes.use("/static", staticRoutes);
routes.use("/visa-application", applicationRouter);

export default routes;
