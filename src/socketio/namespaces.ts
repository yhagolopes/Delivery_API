import { Server } from "socket.io";

import createChatNamespace from "./chat.js";

const ioNamespaces = (io: Server) => {
  createChatNamespace(io);
};

export default ioNamespaces;
