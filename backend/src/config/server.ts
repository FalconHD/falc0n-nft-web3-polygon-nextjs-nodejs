import dotenv from "dotenv";
import express, { Express } from "express";
import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { handleError, notFound, limiter } from "@middlewares";

export const app = express();
// change default environment path
dotenv.config();


export const initServer = (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(compression());
  app.use(helmet());
  app.use(cors());
  app.use(morgan("dev"));
  app.use(limiter);

  const { PORT } = process.env;
  app.listen(PORT || 5000, async () => {
    console.log(`🚀 Server ready at: ${PORT}`);
  });
};
