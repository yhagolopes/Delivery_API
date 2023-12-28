export interface IImage {
  mime: string;
  data: Buffer;
}

export interface IMessage {
  userId: string;
  text?: string;
  image?: IImage;
  sendedAt: number;
}
