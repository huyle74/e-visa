import { Router } from "express";
import guardController from "@/controllers/guard/guard.controller";

const guardRoute = Router();
guardRoute.post("/", guardController);

export default guardRoute;
