import initialServer from "./app";
import { createServer } from "http";
import { initSocket } from "./socket/io";
import registerSocketHandlers from "./socket/handlers";

import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 8080;

(async () => {
  const app = await initialServer();
  const server = createServer(app);
  const io = initSocket(server);
  registerSocketHandlers(io);

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
})();
