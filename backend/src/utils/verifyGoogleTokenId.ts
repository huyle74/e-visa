import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { googleCredentials } from '../config/envLoader';

const AuthClient = new OAuth2Client(googleCredentials.clientId);

const verifyGoogleTokenId = async (idToken: string): Promise<TokenPayload> => {
  const ticket = await AuthClient.verifyIdToken({
    idToken,
    audience: googleCredentials.clientId,
  });
  const payload = ticket.getPayload();
  if (!payload) throw new Error('Invalid google token');
  return payload;
};

export default verifyGoogleTokenId;
