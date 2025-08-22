import { Router } from "express";
import loginRoute from "./user/auth.routes";
import createAccountRoute from "./user/register.routes";
import verifyEmailRoute from "./user/verifyEmail.routes";
import forgotPasswordRoute from "./user/forgotPassword.routes";
import googleLoginRoute from "./user/googleLogin.routes";
import mainRoute from "./home/main.routes";
import paypalRoute from "./paypal/paypal.routes";
import staticRoutes from "./static/static.routes";

const routes = Router();

routes.use("/login", loginRoute);
routes.use("/create-account", createAccountRoute);
routes.use("/verify-email", verifyEmailRoute);
routes.use("/forgot-password", forgotPasswordRoute);
routes.use("/login-google", googleLoginRoute);
routes.use("/home", mainRoute);
routes.use("/payment", paypalRoute);
routes.use("/static", staticRoutes);

export default routes;
