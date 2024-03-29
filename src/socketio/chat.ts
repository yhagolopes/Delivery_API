import { Server, Socket, Namespace } from "socket.io";

import authErrors from "../errors/auth/auth.js";
import authAccessToken from "./middlewares/authAccessToken.js";
import validationErrors from "../errors/validations/validations.js";

import saveMessageInDatabase from "../utils/saveMessageInDatabase.js";
import getUserFromToken from "../utils/getUserFromToken.js";
import getImageFromBuffer from "../utils/getImageFromBuffer.js";
import { IMessage } from "../models/chat.js";

const _authConnection = async (
  socket: Socket,
  next: (error?: Error) => void
) => {
  const chatId = socket.handshake.query.chatId as string;
  const accessToken = socket.handshake.headers.authorization as string;

  const error = await authErrors.chatAccess(chatId, accessToken);
  if (error !== null) return next(new Error(error));

  // Save Data
  const user = await getUserFromToken(accessToken);
  socket.data.publicId = user.public.id;
  socket.data.chatId = chatId;

  next();
};

const _connection = (namespace: Namespace) => {
  namespace.on("connection", (socket: Socket) => {
    const { chatId } = socket.data;

    socket.join(chatId);
    handleUserMessages(socket);
  });

  interface IUserMessage {
    text?: string;
    imageBuffer?: Buffer;
  }
  const handleUserMessages = (socket: Socket) => {
    socket.on("message", async (message: IUserMessage) => {
      const { chatId, publicId } = socket.data;
      const { text, imageBuffer } = message;

      const error = await validationErrors.userMessage(text, imageBuffer);
      if (error !== null) {
        socket.emit("error", error);
        return;
      }

      saveMessageInDatabase(chatId, {
        userId: publicId,
        text: text,
        image: await getImageFromBuffer(imageBuffer),
        sendedAt: Date.now(),
      } as IMessage);

      namespace.in(chatId).emit("message", message);
    });
  };
};

const createChatNamespace = (io: Server) => {
  const chatNamespace = io.of("/chat");
  chatNamespace.use(authAccessToken);
  chatNamespace.use(_authConnection);

  _connection(chatNamespace);
};

export default createChatNamespace;
