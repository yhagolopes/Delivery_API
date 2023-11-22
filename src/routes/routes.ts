import { Request, Response, Router } from "express";

import userRouter from "./user.js";
import publicRouter from "./public.js";

const itsWorking = (request: Request, response: Response) => {
  response.status(200).send("Welcome To Delivery API.");
};

const router = Router();
router.get("/", itsWorking);

router.use("/private", userRouter);
router.use("/public", publicRouter);

export default router;
