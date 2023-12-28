import validateImage from "./image.js";

const TEXT_MAX_LENGTH: number = 500;

const validateUserMessage = async (
  text?: string,
  imageBuffer?: Buffer
): Promise<string | null> => {
  if (text === undefined && imageBuffer === undefined) {
    return "Message Is Empty";
  }

  if (text !== undefined && text.length > TEXT_MAX_LENGTH) {
    return "Max Characters Is 500";
  }

  if (imageBuffer !== undefined) {
    const imageError = await validateImage(imageBuffer);
    if (imageError !== null) return imageError;
  }

  return null;
};

export default validateUserMessage;
