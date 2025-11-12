import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes";
import corsOption from "./config/corsConfig";
import next from "next";
import path from "path";

const frontendDir = path.resolve(__dirname, "../../frontend");

const dev = process.env.APP_ENV !== "production";
const nextApp = next({ dev, dir: frontendDir }); // 👈 path to your Next.js app
const handle = nextApp.getRequestHandler();

const createServer = async () => {
  await nextApp.prepare();
  const app = express();
  app.use(cors(corsOption));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api", routes);

  app.use((req, res) => handle(req, res));

  console.log(process.env.APP_ENV );

  return app;
};

export default createServer;
