import { ICollection } from "@/interfaces";
import Link from "next/link";
import React from "react";
import { NftCard } from "..";

export const GridCards = ({ id, nfts }: { id: string; nfts: any }) => {
  return (
    <div className="grid place-content-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
      {!(nfts?.length > 0)
        ? Array(4)
            .fill(0)
            .slice(0, 8)
            .map((e, idx) => (
              <div
                key={idx}
                className="border border-grayDark flex flex-col gap-5 justify-between items-center shadow h-[400px] rounded-md p-4 max-w-sm w-full mx-auto"
              >
                <div className="rounded-md bg-slate-700 flex-1 w-full" />
                <div className="animate-pulse flex space-x-4 w-full">
                  <div className="flex-1 space-y-6 py-1 w-full">
                    <div className="h-2 bg-slate-700 rounded w-full" />
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-700 rounded col-span-2" />
                        <div className="h-2 bg-slate-700 rounded col-span-1" />
                      </div>
                      <div className="h-2 bg-slate-700 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            ))
        : nfts?.map((nft: any, idx: number) => (
            <Link
              key={idx}
              href={`/${id}/${nft?.nftToken?.toString()}`}
              passHref
            >
              <NftCard nft={nft} />
            </Link>
          ))}
    </div>
  );
};
