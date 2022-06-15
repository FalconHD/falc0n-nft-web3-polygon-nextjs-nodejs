import { ethers } from "ethers";
import { useModal } from "hooks/Modal";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

// type Iitem = {
//   id: number;
//   name: string;
//   image: string;
//   revenue: string;
// };

export const SellerCardWithControl = ({ item }: { item: any }) => {
  const meRef = useRef();
  const [modalState, openModalWithData, closeModal] = useModal();

  return (
    <div className="w-[12rem] min-w-[12rem] bg-Black-3 rounded-lg  ">
      <div className="flex justify-between px-4 pt-4">
        <span className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-semibold">
          {item.id || 0}
        </span>
        <div className="flex justify-end relative">
          <button
            className=" text-gray-500  hover:bg-gray-700  focus:ring-1 focus:outline-none  focus:ring-gray-700 rounded-lg text-sm p-1.5"
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
            className="hidden z-50 absolute top-10 -left-full w-44 text-base list-none  rounded divide-y divide-gray-100 shadow bg-Black-3"
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
                    openModalWithData("add_owner", item, "addOwner")
                  }
                  className="cursor-pointer block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Add Owner
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center pb-5">
        <span className="relative">
          <Image
            className="mb-3 w-24 h-24 rounded-full shadow-lg "
            src={
              item?.metadata?.profile
                ? "https://ipfs.infura.io/ipfs/" + item.metadata.profile
                : "https://lh3.googleusercontent.com/AAWuJ_jXpfMCMY9RIZHxxuEs3LxfK-NWs_MXKH433Jt8UlDv1suxvrhOm1zEGnvHqjhykVftF5qYzrsUlBZlHEj4Ulz4Fuc0c6n4jg=w600"
            }
            objectFit="cover"
            loading="lazy"
            alt="Bonnie image"
            width={96}
            height={96}
          />
          <svg
            width={15}
            height={15}
            className="absolute bottom-3 right-3 "
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="7.5" cy="7.5" r="7.5" fill="#00B347" />
            <path
              d="M6.79755 10.8038C6.69704 10.8038 6.59654 10.7654 6.51997 10.6888L4.11517 8.28391C3.96161 8.13042 3.96161 7.88225 4.11517 7.72876C4.26866 7.57527 4.51676 7.57527 4.67032 7.72876L6.79755 9.85598L11.3297 5.32389C11.4832 5.1704 11.7313 5.1704 11.8849 5.32389C12.0384 5.47745 12.0384 5.72555 11.8849 5.87911L7.0752 10.6888C6.99863 10.7654 6.89805 10.8038 6.79755 10.8038Z"
              fill="white"
            />
          </svg>
        </span>
        <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
          {item?.metadata?.name || "unammed"}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {/* {revenue} */}
        </span>
      </div>
    </div>
    // </Link>
  );
};
