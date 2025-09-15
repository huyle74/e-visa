import { Router } from "express";
import adminController from "@/controllers/admin/admin.controller";

const adminRoute = Router();

adminRoute.post("/get-user-data", adminController.getUserData);

export default adminRoute;
