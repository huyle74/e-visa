import { Request, Response } from 'express';
import {
  responseSuccess,
  responseFailed,
  responseError,
} from '../../utils/response.helper';

const paypalController = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    console.error(error);
    responseError({ res, message: '' });
  }
};

export default paypalController;
