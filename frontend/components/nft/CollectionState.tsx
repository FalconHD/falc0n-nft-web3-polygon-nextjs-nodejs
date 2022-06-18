import React, { useEffect } from "react";

export const CollectionState = ({ collection }: { collection: any }) => {
  return (
    <div>
      <section className="flex justify-center items-center gap-1">
        <h1 className="text-4xl font-bold text-white">
          {collection?.metadata?.name || "Falc0n"}
        </h1>
        <svg
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="30px"
          height="30px"
          viewBox="0 0 40 40"
          xmlSpace="preserve"
        >
          <g>
            <path
              d="M20,0C8.974,0,0,8.973,0,20c0,11.027,8.974,20,20,20c11.029,0,20-8.973,20-20C40,8.973,31.029,0,20,0z M28.818,17.875
                l-8.562,8.564c-0.596,0.595-1.377,0.893-2.158,0.893c-0.779,0-1.561-0.298-2.156-0.893l-4.758-4.758
                c-1.191-1.191-1.191-3.124,0-4.313c1.191-1.192,3.121-1.192,4.314,0l2.6,2.6l6.408-6.407c1.188-1.189,3.123-1.189,4.312,0
                C30.01,14.752,30.01,16.684,28.818,17.875z"
            />
          </g>
        </svg>
      </section>
      <section className="w-full flex justify-center items-center text-white font-thin">
        Created By &nbsp;
        <span className="font-medium text-primary">
          {collection?.owner?.name?.toUpperCase() || collection?.creator.slice(0, 5)}
        </span>
      </section>
      <section className="w-full flex justify-center items-center py-4">
        <span className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-4  gap-0 rounded-2xl border border-Black-1 overflow-hidden">
          <div className="border p-3 border-Black-1 flex flex-col  justify-center gap-3 items-center">
            <p className="text-grayLight text-xl font-bold">
              {collection?.nfts.length || 0}
            </p>
            <p className="text-grayLight text-xl font-semibold text-center">
              Item
            </p>
          </div>
          <div className="border p-3 border-Black-1 flex flex-col justify-center gap-3 items-center">
            <p className="text-grayLight text-xl font-bold">
              {collection?.owners?.length + 1 || 1}
            </p>
            <p className="text-grayLight text-xl font-semibold text-center">
              Owner
            </p>
          </div>
          <div className="border p-3 border-Black-1 flex flex-col justify-center gap-3 items-center">
            <p className="text-grayLight text-xl font-bold">
              {collection?.floor_price}
            </p>
            <p className="text-grayLight text-xl font-semibold text-center">
              Floor Price
            </p>
          </div>
          <div className="border p-3 border-Black-1 flex flex-col justify-center gap-3 items-center">
            <p className="text-grayLight text-xl font-bold">0.5</p>
            <p className="text-grayLight text-xl font-bold text-center">
              Volume Traded
            </p>
          </div>
        </span>
      </section>
    </div>
  );
};
