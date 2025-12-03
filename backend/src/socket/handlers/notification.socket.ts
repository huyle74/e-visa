import { Socket, Server } from "socket.io";

const notificationSocketHandler = (socket: Socket, io: Server) => {
  socket.on("notification", async (data) => {
    console.log(data);
  });
};

export default notificationSocketHandler;
