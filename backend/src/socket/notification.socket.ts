import { Socket, Server } from "socket.io";

const notificationHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(socket.id);
  });
};

export default notificationHandler;
