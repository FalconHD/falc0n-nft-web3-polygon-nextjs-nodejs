import {
  openModal,
  modalProps,
  closeModal as close,
  resetModal,
} from "@/slices";
import React, { useEffect, useState } from "react";
import { useSlice } from "./reduxHooks";
import { useWallet, useFetch } from "@/hooks";
import { ICollectionInput } from "@/interfaces";
import { useRouter } from "next/router";

export const useBlockchain = (cb: Function) => {
  const { contrat, address } = useWallet();
  const [{ user }, dispatch] = useSlice("contract");
  const [{ redirect }, _] = useSlice("Modal");
  const { push } = useRouter();
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [blockLoading, setBlockLoading] = useState<boolean>(false);
  const [fetcher, { data, loading, error: fetchError, isError }] = useFetch();

  const runner = async (args?: any) => {
    setBlockLoading(true);
    try {
      let final = await cb({
        contract: contrat,
        fetcher,
        data,
        args,
        dispatch,
        address,
      });
      dispatch(resetModal());
      setBlockLoading(false);
      setResult(final);
    } catch (error) {
      console.log(error);

      setError(error);
    }
    redirect && push(redirect);
  };

  return { runner, data: result, loading: blockLoading, error, isError };
};
