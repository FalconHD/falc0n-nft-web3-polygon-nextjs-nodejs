import Link from "next/link";
import React from "react";
import { OutlinedButton } from "..";
import { GridCards } from ".";
import { ICollection } from "@/interfaces";

export const TopNFTS = ({ nfts }: { nfts: any }) => {
  return (
    <>
      <h1 className="text-white text-3xl font-semibold my-10">
        Top NFTS
      </h1>
      <GridCards id="nft" nfts={nfts || []} />
      <span className="flex justify-center items-center py-16">
        <OutlinedButton
          text="Load More"
          to="/explore"
          extra="lg:w-1/4 md:w-2/4 sm:w-2/4 w-3/4"
        />
      </span>
    </>
  );
};
