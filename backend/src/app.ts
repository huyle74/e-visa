import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes";
import corsOption from "./config/corsConfig";

const app = express();
app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

export default app;
