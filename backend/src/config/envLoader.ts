import dotenv from 'dotenv';
dotenv.config();

const JWT_PRIVATE_KEY =
  process.env.JWT_PRIVATE_KEY?.replace(/\\n/g, '\n') || '';
const JWT_PUBLICK_KEY =
  process.env.JWT_PUBLICK_KEY?.replace(/\\n/g, '\n') || '';

const url = process.env.URL;
const googleCredentials = {
  clientId: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  redirectUri: process.env.GOOGLE_REDIRECT_URI || '',
  googleAuthUri: process.env.GOOGLE_AUTH_URI || '',
  googleTokenUri: process.env.GOOGLE_TOKEN_URI || '',
};

const email = process.env.EMAIL || '';
const emailPassword = process.env.EMAIL_PASSWORD || '';

const paypalCredentials = {
  cliend_id: process.env.PAYPAL_CLIEND_ID,
  client_secret: process.env.PAYPAL_CLIEND_SECRET,
};

const paypalApiUrl =
  process.env.PAYPAL_API_PREFIX || 'https://api-m.sandbox.paypal.com/v1';

const appUrl = process.env.APP_URL || '';

export {
  JWT_PRIVATE_KEY,
  JWT_PUBLICK_KEY,
  url,
  googleCredentials,
  email,
  emailPassword,
  paypalCredentials,
  paypalApiUrl,
  appUrl,
};
