import { config } from "dotenv";
config();

import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import routes from "./routes/routes.js";
import tasks from "./tasks.js";

const PORT: string = process.env.PORT || "3001";
const DATABASE_URL: string = process.env.DATABASE_URL || "";

const preventBadData = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof SyntaxError) {
    return response.status(400).json({ message: "Invalid data." });
  }
  next();
};

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(preventBadData);
app.use(routes);

const initAppCallback = async () => {
  await mongoose.connect(DATABASE_URL);
  console.log(`- Server ON.\nLINK: 'http://localhost:${PORT}'.`);

  // Periodic tasks
  tasks.deleteExpiredCodesFromDatabase();
  tasks.deleteExpiredTokensFromDatabase();
};
app.listen(PORT, initAppCallback);
