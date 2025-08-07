import { Request } from 'express';
import { validationResult } from 'express-validator';

export const validationResponse = (req: Request) => {
  const errors = validationResult(req);
  let message;
  if (!errors.isEmpty()) {
    message = errors.array().map(err => {
      return err.msg;
    });
    return message;
  } else return undefined;
};
