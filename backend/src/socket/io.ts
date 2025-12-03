import { Server } from "socket.io";
import { Server as httpServer } from "http";
import corsOption from "@/config/corsConfig";

let io: Server;

export function initSocket(server: httpServer) {
  io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(server, { cors: corsOption });

  return io;
}

export function getIO() {
  if (!io) throw new Error("Socket IO not init yet");

  return io;
}

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}
interface ClientToServerEvents {
  hello: () => void;
}
interface InterServerEvents {
  ping: () => void;
}
interface SocketData {
  name: string;
  age: number;
}
