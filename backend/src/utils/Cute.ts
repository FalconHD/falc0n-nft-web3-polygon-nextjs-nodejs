import { RequestFunc } from "@interfaces";
import { NextFunction, Request, Response } from "express";

// Cute function make the try catch block shorter
export const cute =
  (fn: RequestFunc) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };