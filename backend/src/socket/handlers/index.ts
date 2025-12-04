import { Server } from "socket.io";
import notificationSocketHandler from "./notification.socket";

export default function registerSocketHandlers(io: Server) {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    notificationSocketHandler(socket, io);
  });
}
