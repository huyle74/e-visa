import { Router } from "express";
import {
  loginValidator,
  changePasswordValidator,
  adminLoginValidator,
} from "@/dto/auth.dto";
import adminLoginController from "@/controllers/admin/login.controller";

const adminLoginRoute = Router();

adminLoginRoute.post("/login", loginValidator, adminLoginController.login);
adminLoginRoute.post(
  "/create-new-password",
  changePasswordValidator,
  adminLoginController.forgotPassword
);
adminLoginRoute.post(
  "/create-admin-account",
  adminLoginValidator,
  adminLoginController.createAdminAccount
);

export default adminLoginRoute;
