import { Response } from 'express';

interface responseDto {
  res: Response;
  data?: any;
  message: string | string[];
}

export const responseSuccess = ({ res, data = [], message }: responseDto) => {
  return res.status(200).json({ success: 'OK', data, message });
};

export const responseFailed = ({ res, data = [], message }: responseDto) => {
  return res.status(400).json({ success: 'Failed', data: [], message });
};

export const responseError = ({ res, data = [], message }: responseDto) => {
  return res.status(500).json({ success: 'Error', data, message });
};
