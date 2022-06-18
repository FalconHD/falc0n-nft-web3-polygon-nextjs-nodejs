import { useModal } from "hooks/Modal";
import Link from "next/link";
import React, { useRef } from "react";
import { NftCard } from "..";

export const ControledNFTS = ({ nft }: { nft: any }) => {
  const meRef = useRef();
  const [_, openModalWithData] = useModal();
  return (
    <div className="p-0 m-0 relative">
      <button
        className=" absolute right-3 top-2 z-20 text-gray-500  hover:bg-gray-700  focus:ring-1 focus:outline-none  focus:ring-gray-700 rounded-lg text-sm p-1.5"
        type="button"
        onClick={() => {
          //@ts-ignore
          if (meRef.current.classList?.contains("hidden")) {
            //@ts-ignore
            meRef.current.classList?.remove("hidden");
          } else {
            //@ts-ignore
            meRef.current.classList?.add("hidden");
          }
        }}
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>
      <div
        //@ts-ignore
        ref={meRef}
        className="hidden z-50 absolute top-10 right-0  w-44 text-base list-none  rounded divide-y divide-gray-100 shadow bg-Black-3"
      >
        <ul className="py-1" aria-labelledby="dropdownButton">
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Edit
            </a>
          </li>
          <li>
            <a
              onClick={() =>
                nft?.onSale
                  ? openModalWithData("unlist_nft", nft, "unlistNFT")
                  : openModalWithData("list_nft", nft, "listNFT")
              }
              className="cursor-pointer block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              {nft.onSale ? "Unlist" : "List"}
            </a>
          </li>
          <Link href={`/nft/${nft?.nftToken.toString()}`}>
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Go
              </a>
            </li>
          </Link>
        </ul>
      </div>
      <NftCard nft={nft} />
    </div>
  );
};
