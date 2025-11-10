import { Response, Request } from "express";
import chooseCountriesService from "@/services/visa-application/0thChooseCountry.service";
import {
  responseError,
  responseFailed,
  responseSuccess,
} from "@/utils/response.helper";

const chooseCountriesController = {
  async getFromToCountries(req: Request, res: Response) {
    try {
      const countries = await chooseCountriesService.getFromToCountries();
      if (!countries)
        return responseFailed({ res, message: "Cannot get from to list" });

      return responseSuccess({ res, data: countries });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },
  async getPrice(req: Request, res: Response) {
    try {
      const { from, to } = req.body;
      if (!from || !to)
        return responseFailed({ res, message: "Missing country in body" });

      const data = await chooseCountriesService.getPrice(from, to);

      return responseSuccess({ res, data });
    } catch (error: any) {
      console.error(error);
      const message = error?.message;
      return responseError({ res, message });
    }
  },
};

export default chooseCountriesController;
