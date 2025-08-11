import { randomBytes } from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { google } from 'googleapis';
import { googleCredentials } from '../config/envLoader';

const googleAuth = new google.auth.OAuth2({
  client_id: googleCredentials.clientId,
  client_secret: googleCredentials.clientSecret,
  redirectUri: googleCredentials.redirectUri,
});

const scope = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'openid',
  'profile',
  'email',
  'phone',
  'address',
];

const state = randomBytes(32).toString('hex');
const url = googleAuth.generateAuthUrl({
  access_type: 'offline',
  scope,
  state,
});

const googleLoginMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(url);

  const code = req.query.code as string;
  if (!code) throw new Error('code is missing');

  const { tokens } = await googleAuth.getToken({ code });
  if (!tokens.id_token) {
    return res
      .status(401)
      .send('No id_token returned — did you include "openid" in scope?');
  }
  req.token = tokens;

  next();
  try {
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export default googleLoginMiddleWare;
