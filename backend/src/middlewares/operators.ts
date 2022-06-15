import { NextFunction, Request, Response } from "express";

export const or = (...func: Array<Function>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = func.some((f) => f(req, res, next) === true);
    if (!result) next(new Error("authorization failed"));
    next();
  };
};

export const and = (...func: Array<Function>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = func.every((f) => f(req, res, next) === true);
    if (!result) next(new Error("validation failed"));
    next();
  };
};
