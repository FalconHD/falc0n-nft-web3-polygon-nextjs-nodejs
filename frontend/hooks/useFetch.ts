import { IRequest } from "@/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (): [
  ({ url, method, body, headers }: IRequest) => Promise<any>,
  {
    loading: boolean;
    data?: FormData | any;
    error: any;
    isError: boolean;
  }
] => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const fetcher = async ({ url, method, body, headers }: IRequest) => {
    setLoading(true);
    try {
      const json = await fetchData(url, method, body, headers);
      setData(json);
      setLoading(false);
      setIsError(false);
      return json;
    } catch (error) {
      setLoading(false);
      setError(error);
      setIsError(true);
    }
  };
  return [fetcher, { data, loading, error, isError }];
};

const fetchData = async (
  path: string,
  method: string,
  body?: any,
  headers?: any
) => {
  const url =
    process.env.NODE_ENV == "development"
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL_PROD}${path}`;


  const result =
    method == "GET"
      ? await axios.get(url, {
          headers,
        })
      : await axios.post(url, body, {
          headers,
        });

  return result?.data;
};
