import { verifyToken } from "@lib";
import { NextFunction, Request, Response } from "express";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers.authorization) {
      const tokensData = verifyToken(
        req.headers.authorization.split(" ")[1],
        process.env.JWT_SECRET
      );
      if (tokensData) {
        //@ts-ignore
        req.User = tokensData;
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
