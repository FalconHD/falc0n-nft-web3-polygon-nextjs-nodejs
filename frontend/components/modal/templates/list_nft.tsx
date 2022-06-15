import { setBridge, setRedirection } from "@/slices";
import { GlobalInput } from "components/global";
import { useSlice } from "@/hooks";
import React, { useEffect, useState } from "react";

export const List_nft = ({ nft }: { nft: any }) => {
  const [price, setPrice] = useState(nft?.price);
  const [{}, dispatch] = useSlice("modal");

  useEffect(() => {
    dispatch(setBridge({ price }));
    dispatch(setRedirection("/nft/" + nft?.nftToken?.toString()));
  }, [price]);

  return (
    <div>
      <h1 className="mb-4 text-xl">
        You are about to list {nft?.metadata?.name}:
      </h1>
      <div className="flex flex-col gap-3 w-full">
        <GlobalInput
          label={`update price ? `}
          handleChange={(e) => setPrice(e.target.value)}
          type="number"
          value={price}
          error={""}
        />
      </div>
    </div>
  );
};
