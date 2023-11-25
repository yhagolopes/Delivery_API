import { Socket } from "socket.io";

const middleware = async () => {};

const connection = (socket: Socket) => {
  socket.emit("Hello Word");
};

export default {
  middleware,
  connection,
};
