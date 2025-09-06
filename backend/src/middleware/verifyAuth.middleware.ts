import { Response, Request, NextFunction } from "express";
import { responseError, responseFailed } from "@/utils/response.helper";
import { verify } from "@/utils/jwt";

export default function authenticationMiddleware() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const auth = req.header("Authorization") || "";
      const [schema, token] = auth.split(" ");

      if (schema !== "Bearer" || !token)
        return responseFailed({
          res,
          message: '"Missing or invalid Authorization header"',
        });

      const decode = verify(token);
      (req as any).user = decode;
      next();
    } catch (error) {
      console.error(error);
      responseError({ res, message: "Failed to authenticate" });
    }
  };
}
