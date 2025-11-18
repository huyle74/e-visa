import { Request, Response, NextFunction } from "express";
import { google } from "googleapis";
import { googleCredentials } from "../config/envLoader";

const googleAuth = new google.auth.OAuth2({
  client_id: googleCredentials.clientId,
  client_secret: googleCredentials.clientSecret,
  redirectUri: googleCredentials.redirectUri,
});

const googleLoginMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const code = req.query.code as string;

  if (code) {
    const { tokens } = await googleAuth.getToken({ code });
    if (!tokens.id_token) {
      return res
        .status(401)
        .send('No id_token returned — did you include "openid" in scope?');
    }
    req.token = tokens;
  } else {
    req.token = {};
  }

  next();
  try {
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export default googleLoginMiddleWare;
