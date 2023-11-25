import { Server, Socket } from "socket.io";

import validateAccessToken from "../validations/accessToken.js";
import chatNamespace from "./chat.js";

const authAccessToken = async (socket: Socket, next: () => void) => {
  const { accessToken } = socket.handshake.auth;
  const requesterIp = socket.handshake.address;

  const validationErrors = await validateAccessToken(accessToken, requesterIp);
  if (validationErrors !== null) return;

  next();
};

const ioNamespaces = (io: Server) => {
  io.of("/chat")
    .use(authAccessToken)
    .use(chatNamespace.middleware)
    .on("connection", chatNamespace.connection);
};

export default ioNamespaces;
