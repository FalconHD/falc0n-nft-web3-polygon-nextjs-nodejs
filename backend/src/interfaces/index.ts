import { Signer } from "ethers";
import { NextFunction, Request, Response } from "express";

export interface IUserTokenProps {
  name: string;
  email: string;
  _id: string;
}

export type RequestFunc = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<any>;

export type ICollection = {
  name: string;
  description: string;
  price: string;
};
