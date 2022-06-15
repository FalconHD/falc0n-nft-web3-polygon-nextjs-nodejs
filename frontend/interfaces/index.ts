import { NextPage } from "next";
import { ReactElement } from "react";

export interface IButton {
  text: string | Function;
  to?: string;
  onClick?: () => void;
  extra?: string;
}

export type NextWithLayoutPage = NextPage & { extraStyles?: string[] };

export interface ICollection {
  id?: string;
  name: string;
  description?: string;
  image: string;
  cover: string;
  nfts?: INft[];
}

export type IRequest = {
  url: string;
  method: string;
  body?: any;
  headers?: any;
};

export interface ICollectionInput extends FormData {
  name: string;
  description?: string;
  image: string;
  cover: string;
}

export interface INft {
  id?: string;
  name: string;
  description?: string;
  image: string;
  cover?: string;
  price: number;
  owner: IOwner;
  collection?: string;
}

export type IOwner = {
  id?: string;
  name: string;
  description?: string;
  joined: string;
};
