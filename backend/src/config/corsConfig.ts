import { CorsOptions } from "cors";
import { appUrl, paypalApiUrl, googleCredentials, adminUrl } from "./envLoader";

const allowList = [
  appUrl,
  paypalApiUrl,
  googleCredentials.googleAuthUri,
  adminUrl,
];
const corsOption: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin) return callback(null, true);
    if (allowList.indexOf(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  exposedHeaders: ["X-File-Name", "Content-Type"],
  credentials: true,
};

export default corsOption;
