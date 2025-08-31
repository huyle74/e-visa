import { Response, Request } from "express";
import { responseSuccess, responseFailed, responseError } from "@utils/response.helper";
import { staticService } from "@/services/static/static.service";

export const staticController = {
  async getCitiesByState(req: Request, res: Response) {
    try {
      const { state } = req.query;
      if (!state) return responseFailed({ res, message: "State param is missing!" });

      const results = await staticService.getCitiesByState(`${state}`);
      responseSuccess({ res, message: "get cities data successfully", data: results });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },

  async getAllCountries(req: Request, res: Response) {
    try {
      const results = await staticService.getAllCountries();
      return responseSuccess({
        res,
        data: results,
        message: "get countries successfully!",
      });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },
  async getStateByCountry(req: Request, res: Response) {
    try {
      const { country } = req.query;
      if (!country) return responseFailed({ res, message: "country param is missing!" });

      const results = await staticService.getStatesByCountry(`${country}`);
      responseSuccess({ res, message: "get State data successfully", data: results });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },

  async getDataforEligibilty(req: Request, res: Response) {
    try {
      const data = await staticService.getEligibiltyOption();
      responseSuccess({ res, data });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },

  async getDataforApplicationInformation(req: Request, res: Response) {
    try {
      const data = await staticService.getApplicationInformationOption();
      responseSuccess({ res, data });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },
};
