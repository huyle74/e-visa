import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes";
import corsOption from "./config/corsConfig";
import next from "next";
import path from "path";

const frontendDir = path.resolve(__dirname, "../../frontend");
const adminDir = path.resolve(__dirname, "../../admin-ui");

const dev = process.env.APP_ENV !== "production";
const nextApp = next({ dev, dir: frontendDir });
const handleNext = nextApp.getRequestHandler();

const adminNextApp = next({ dev, dir: adminDir });
const handleAdminNext = adminNextApp.getRequestHandler();

const ADMIN_HOST = process.env.ADMIN_URL || "admin.localhost";

const createServer = async () => {
  await nextApp.prepare();
  await adminNextApp.prepare();
  const app = express();
  app.use(cors(corsOption));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api", routes);
  app.use((req, res) => {
    const host = req.hostname;
    console.log(host);
    if (host === ADMIN_HOST) {
      return handleAdminNext(req, res);
    }
    return handleNext(req, res);
  });
  return app;
};

export default createServer;
