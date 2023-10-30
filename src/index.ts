import express, { Request, Response, Express } from "express";

import dotenv from "dotenv";
dotenv.config();

// Global variables
const PORT: string | number = process.env.PORT || 3000;

const main = async (): Promise<void> => {
  // Main application
  const app: Express = express();

  app.get("/", (request: Request, response: Response) => {
    response.send("Hello Word");
  });

  app.listen(PORT, () => {
    console.log(`- Server ON.\nLINK: 'http://localhost:${PORT}'.`);
  });
};

// Start
main();
