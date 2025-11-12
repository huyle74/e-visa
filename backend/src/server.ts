import createServer from "./app";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 8080;

createServer().then((server) => {
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
