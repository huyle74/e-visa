import { Router } from "express";
import adminController from "@/controllers/admin/admin.controller";

const adminRoute = Router();

adminRoute.post("/list-customers", adminController.getUserData);
adminRoute.post("/list-admin", adminController.getAllAdmin);
adminRoute.post("/verify-accessToken", adminController.guardAdmin);

export default adminRoute;
