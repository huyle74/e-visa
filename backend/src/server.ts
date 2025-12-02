import initialServer from "./app";
import { createServer } from "http";
import socket from "./socket";

import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 8080;

(async () => {
  const app = await initialServer();
  const server = createServer(app);
  socket(server);

  server.listen(port, () => {
    console.log("Server running at http://localhost:", port);
  });
})();
