import { CorsOptions } from 'cors';
import { appUrl, paypalApiUrl, googleCredentials } from './envLoader';

const allowList = [appUrl, paypalApiUrl, googleCredentials.googleAuthUri];
const corsOption: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin) return callback(null, true);
    if (allowList.indexOf(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

export default corsOption;
