import { Router } from "express";
import paypalController from "@/controllers/paypal/paypal.controller";

const paypalRoute = Router();
paypalRoute.post("/create-order", paypalController.createOrder);
paypalRoute.post("/capture-order", paypalController.captureOrder);

export default paypalRoute;
