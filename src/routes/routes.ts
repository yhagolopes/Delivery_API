import { Request, Response, Router } from "express";

import chatRouter from "./chat.js";
import publicRouter from "./public.js";

const itsWorking = (request: Request, response: Response) => {
  response.status(200).send("Welcome To Delivery API.");
};

const router = Router();
router.get("/", itsWorking);

router.use("/chat", chatRouter);
router.use("/public", publicRouter);

export default router;
