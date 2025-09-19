import { Router } from "express";
import adminController from "@/controllers/admin/admin.controller";

const customerRoute = Router({ mergeParams: true });

customerRoute.get("/list", adminController.getListCostumers);
customerRoute.get("/:customerId", adminController.getOneCustomer);

export default customerRoute;
