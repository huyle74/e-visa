import { Router } from "express";
import userHomeController from "@/controllers/user/home.controller";

const homeRoute = Router();
homeRoute.get("/", userHomeController.homePage);

export default homeRoute;
