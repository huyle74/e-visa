import dotenv from 'dotenv';
dotenv.config();

const JWT_PRIVATE_KEY =
  process.env.JWT_PRIVATE_KEY?.replace(/\\n/g, '\n') || '';
const JWT_PUBLICK_KEY =
  process.env.JWT_PUBLICK_KEY?.replace(/\\n/g, '\n') || '';

const url = process.env.URL;
const googleCredentials = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
};

const email = process.env.EMAIL || '';
const emailPassword = process.env.EMAIL_PASSWORD || '';

export {
  JWT_PRIVATE_KEY,
  JWT_PUBLICK_KEY,
  url,
  googleCredentials,
  email,
  emailPassword,
};
