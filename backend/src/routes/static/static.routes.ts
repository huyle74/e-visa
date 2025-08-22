import { Router } from "express";
import { staticController } from "@/controllers/static/static.controller";
const staticRoutes = Router();

staticRoutes.post("/cities", staticController.getCitiesByState);
staticRoutes.post("/states", staticController.getStateByCountry);
staticRoutes.get("/countries", staticController.getAllCountries);

export default staticRoutes;
