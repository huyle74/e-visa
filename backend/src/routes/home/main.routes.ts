import { Router } from "express";
import mainController from "@/controllers/main/main.controller";

const mainRoute = Router();
mainRoute.get("/", mainController);

export default mainRoute;
