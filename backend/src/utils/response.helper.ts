import { Response } from "express";

interface responseDto {
  res: Response;
  data?: any;
  message?: string | string[];
}

export const responseSuccess = ({
  res,
  data = [],
  message = "successfully",
}: responseDto) => {
  return res.status(200).json({ status: 200, success: "OK", data, message });
};

export const responseFailed = ({ res, data = [], message }: responseDto) => {
  return res
    .status(400)
    .json({ status: 400, success: "Failed", data, message });
};

export const responseError = ({ res, data = [], message }: responseDto) => {
  return res.status(500).json({ status: 500, success: "Error", data, message });
};
