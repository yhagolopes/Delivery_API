import { fileTypeFromBuffer } from "file-type";

// 5 MB
const IMAGE_MAX_SIZE = 5 * (1024 * 1024);
const SUPPORTED_IMAGES: string[] = ["image/png", "image/jpeg"];

const validateImage = async (imageBuffer: Buffer): Promise<string | null> => {
  if (imageBuffer.length > IMAGE_MAX_SIZE) return "Image Is Bigger Than 5MB";

  const fileResult = await fileTypeFromBuffer(imageBuffer);
  if (fileResult === undefined) return "Cant Identify Image Type";

  for (let i = 0; i < SUPPORTED_IMAGES.length; i++) {
    if (fileResult.mime == SUPPORTED_IMAGES[i]) return null;
  }

  return "Unsupported Image";
};

export default validateImage;
