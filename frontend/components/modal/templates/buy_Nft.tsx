import { INft } from "@/interfaces";
import { setRedirection } from "@/slices";
import { NftAssets } from "components/nft";
import { useSlice } from "hooks/reduxHooks";
import { useWallet } from "hooks/useWallet";
import React, { useEffect } from "react";

export const Buy_Nft = ({ nft }: { nft: any }) => {
  const [{}, dispatch] = useSlice("modal");
  useEffect(() => {
    dispatch(setRedirection("/items"));
  }, []);

  return (
    <div className="w-full flex flex-col gap-3 justify-between">
      <section className="flex flex-row justify-between ">
        <h1 className="font-bold">Item</h1>
        <h1 className="font-bold">SubTotal</h1>
      </section>
      <section className="flex flex-col justify-between gap-6">
        <div className="flex flex-row justify-between">
          <span className="w-2/3 flex flex-row items-center gap-5">
            <NftAssets
              image={"https://ipfs.infura.io/ipfs/" + nft?.metadata?.image}
            />
            <div className="w-3/4 flex flex-col gap-2">
              <h1 className="font-medium text-sm">{nft.owner.name}</h1>
              <h1 className="font-light text-sm">{nft?.metadata?.name}</h1>
            </div>
          </span>
          <span>{nft?.price} ETH</span>
        </div>
        <div className="flex flex-row justify-between">
          <span className="font-bold">Tax :</span>
          <span>0.0034 ETH</span>
        </div>
      </section>
      <section className="flex flex-row justify-between ">
        <h1 className="font-bold">Total :</h1>
        <h1>{+nft?.price + 0.0034} ETH</h1>
      </section>
    </div>
  );
};
