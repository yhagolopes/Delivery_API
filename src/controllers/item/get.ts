import { Request, Response } from "express";

import Item from "../../models/item.js";

const get = async (request: Request, response: Response) => {
  const items = await Item.find({});

  response.status(200).json(items);
};

export default get;
