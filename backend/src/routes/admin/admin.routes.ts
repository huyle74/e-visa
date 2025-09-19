import { Router } from "express";
import applicationRoute from "./application/application.routes";
import customerRoute from "./customer/customer.routes";

const adminRoute = Router();

adminRoute.use("/application", applicationRoute);
adminRoute.use("/customer", customerRoute);

export default adminRoute;
