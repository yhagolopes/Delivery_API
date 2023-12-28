import { Request, Response } from "express";

import Item from "../../models/item.js";
import { fileTypeFromBuffer } from "file-type";

const create = async (request: Request, response: Response) => {
  const { name, price, imageData } = request.body;

  const imageBuffer = Buffer.from(imageData);
  const fileResult = await fileTypeFromBuffer(imageBuffer);

  const storedItem = await Item.create({
    name: name,
    price: price,
    image: {
      mime: fileResult!.mime,
      data: imageBuffer,
      uploadedAt: Date.now(),
    },
  });
  if (storedItem === null) {
    response.status(500).json({ message: "Item Bad Creation" });
  }

  response.status(200).json({ message: "Item Created" });
};

export default create;
