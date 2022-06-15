/* tslint:disable */

import { useModal, useSlice, useWallet } from "@/hooks";
import { addOwner } from "blockchain/collection";
import { buyNft, listNFT, unlistNFT } from "blockchain/nfts";
import { useBlockchain } from "hooks/useBlockchain";
import Image from "next/image";
import React, { ReactElement, useEffect, useRef } from "react";
import { FilledButton } from "../global/FilledButton";
import { OutlinedButton } from "../global/OutlinedButton";
import { TEMPLATES, HEADERS, ACTIONS } from "./templates";

const BLOCK_CHAIN_ACTIONS: { [keyof: string]: Function } = {
  addOwner: addOwner,
  buyNft: buyNft,
  unlistNFT: unlistNFT,
  listNFT: listNFT,
};

export const Modal = () => {
  const modalRef = useRef<HTMLDivElement>();
  const [, , closeModal] = useModal();
  const [{ status, template, props, action, bridge }, dispatcher] =
    useSlice("Modal");
  const { address, contrat } = useWallet();
  const { data, runner } = useBlockchain(BLOCK_CHAIN_ACTIONS[action]);

  useEffect(() => {
    if (status == "open" && modalRef.current) {
      modalRef.current.removeAttribute("aria-hidden");
      modalRef.current?.setAttribute("role", "dialog");
      modalRef.current?.setAttribute("aria-modal", "true");
      modalRef.current?.classList.remove("hidden");
      modalRef.current?.classList.add("flex");
    } else if (modalRef.current) {
      modalRef.current?.setAttribute("aria-hidden", "true");
      modalRef.current?.setAttribute("role", "none");
      modalRef.current?.setAttribute("aria-modal", "false");
      modalRef.current?.classList.add("hidden");
      modalRef.current?.classList.remove("flex");
    }
  }, [status]);

  return (
    <div
      //@ts-ignore
      ref={modalRef}
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className="hidden bg-Black-1 bg-opacity-95 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full md:h-full justify-center items-center"
    >
      <div className="relative p-4 w-full max-w-2xl h-auto md:h-auto bg-Dark rounded-xl">
        <div className="relative bg-Dark rounded-lg shadow ">
          <div className="flex justify-between items-start p-4 rounded-t border-b border-grayDarker bg-Dark">
            <h3 className="text-xl font-semibold text-white ">
              {HEADERS[template]}
            </h3>
            <button
              type="button"
              className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
              onClick={() => closeModal()}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="p-6 space-y-6 text-white bg-Dark">
            {TEMPLATES[template] ? (
              TEMPLATES[template](props)
            ) : (
              <h1>no nft selected</h1>
            )}
          </div>
          <div className="flex items-center justify-center p-6 gap-3 border-t border-grayDarker ">
            <FilledButton
              text={
                template == "MetaMaskNotInstalled"
                  ? () => (
                      <span className="relative flex justify-between items-center gap-3">
                        <Image
                          width={60}
                          height={60}
                          objectFit="contain"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/64px-MetaMask_Fox.svg.png"
                        />
                        <h1>Metamask</h1>
                      </span>
                    )
                  : "Accept"
              }
              extra="w-1/2 lg:w-1/3 md:w-1/3  "
              onClick={() =>
                ACTIONS[template]({ contrat, runner, nft: props }, bridge)
              }
            />
            <OutlinedButton
              text="Decline"
              onClick={() => closeModal()}
              extra="w-1/2 lg:w-1/3 md:w-1/3 "
            />
          </div>
        </div>
      </div>
    </div>
  );
};
