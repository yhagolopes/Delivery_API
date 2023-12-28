import { fileTypeFromBuffer } from "file-type";
import { IImage } from "./namespaces.js";

const getImageFromBuffer = async (
  imageBuffer?: Buffer
): Promise<IImage | undefined> => {
  if (imageBuffer === undefined) return undefined;

  const fileResult = await fileTypeFromBuffer(imageBuffer);

  return {
    mime: fileResult!.mime,
    data: imageBuffer,
  } as IImage;
};

export default getImageFromBuffer;
