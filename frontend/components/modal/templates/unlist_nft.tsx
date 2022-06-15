import { setRedirection } from "@/slices";
import { useSlice } from "hooks/reduxHooks";
import React, { useEffect } from "react";

export const Unlist_nft = ({ nft }: { nft: any }) => {
  const [{}, dispatch] = useSlice("modal");

  useEffect(() => {
    dispatch(setRedirection("/nft/" + nft?.nftToken?.toString()));
  }, []);

  return (
    <div>
      <h1 className="text-3xl">Unlisting {nft?.metadata?.name}</h1>
      <h1 className="text-2xl">
        By accepting on this The nft will no longer be for sale{" "}
      </h1>
    </div>
  );
};
