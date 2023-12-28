import { Socket } from "socket.io";

import authErrors from "../../errors/auth/auth.js";

export const authAccessToken = async (
  socket: Socket,
  next: (error?: Error) => void
) => {
  const accessToken = socket.handshake.headers.authorization as string;
  // @Issue
  // SocketIO Ip is not equals to Express IP
  // I will use headers instead and resolve it later
  const requesterIp = socket.handshake.headers.address as string;

  const error = await authErrors.accessToken(accessToken, requesterIp);
  if (error !== null) return next(new Error(error));

  next();
};

export default authAccessToken;
