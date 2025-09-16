import { Router } from "express";
import adminController from "@/controllers/admin/admin.controller";

const adminRoute = Router();

adminRoute.post("/get-user-data", adminController.getUserData);
adminRoute.post("/list-all-admin", adminController.getAllAdmin);
adminRoute.post("/verify-accessToken", adminController.guardAdmin);

export default adminRoute;
