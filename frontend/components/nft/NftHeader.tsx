import React, { useState } from "react";

export const NftHeader = ({
  nftName,
  price,
  owner,
}: {
  nftName: string;
  price: number;
  owner: { name: string; joined: string };
}) => {
  return (
    <div className="flex flex-col">
      <section className="flex flex-col justify-center gap-3">
        <h1 className="text-3xl text-white font-bold">
          {nftName} &nbsp;
          <span className="text-lg rounded-xl border px-7 py-1 text-center">
            9
          </span>
        </h1>
        <span className="flex gap-3 justify-start items-center">
          <h4 className="text-grayLight font-normal text-sm">
            From <strong>{price} ETH</strong>
          </h4>
          <h4 className="text-grayLight font-normal text-2xl -translate-y-2">
            .
          </h4>
          <h4 className="text-grayLight font-normal text-sm">
            20-25 available
          </h4>
        </span>
      </section>
      <section className="flex flex-col gap-4">
        <h4 className="text-grayLight font-normal text-sm">Creator</h4>
        <div className="flex items-center space-x-4">
          <img
            className="w-14 h-14 rounded-full"
            src="https://picsum.photos/200/300"
            alt=""
          />
          <div className="space-y-1 font-medium text-white">
            <div>{owner.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Joined in {owner.joined}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
