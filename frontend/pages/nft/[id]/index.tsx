import React, { useEffect, useState } from "react";
import Image from "next/image";
import { NextWithLayoutPage } from "@/interfaces";
import {
  FilledButton,
  OutlinedButton,
  NftHeader,
  NftExtraData,
  NftAssets,
} from "@/components";
import { useModal, useWallet } from "@/hooks";
import { useBlockchain } from "hooks/useBlockchain";
import { getNftById } from "blockchain/nfts";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import axios from "axios";

const DATA = {};

const Nft: NextWithLayoutPage = () => {
  const [Nft, setNft] = useState<any | null>(null);
  const [modalState, openModalWithData, closeModal] = useModal();
  const { address, setupContract, contrat } = useWallet();
  const { data, runner, error, isError, loading } = useBlockchain(getNftById);
  const {
    query: { id },
  } = useRouter();

  const getNftBlock = async (id: string) => {
    await runner(id);
  };

  const parseNftData = async (block: any) => {
    const tokenUri = await contrat?.tokenURI(block?.nftToken);
    if (!tokenUri) return;
    const { data } = await axios.get(tokenUri);
    setNft({
      nftToken: block?.nftToken.toString(),
      price: parseFloat(ethers.utils.formatUnits(block?.price, 18)),
      metadata: data,
      owner: block?.owner,
      likes: block?.likes,
      onSale: block?.onSale,
    });
  };

  useEffect(() => {
    if (contrat && id) {
      //@ts-ignore
      getNftBlock(id);
    } else {
      setupContract();
    }
  }, [contrat, address, id]);

  useEffect(() => {
    if (data) {
      parseNftData(data);
    }
  }, [data]);

  useEffect(() => {
    console.log(Nft);
  }, [Nft]);

  const nft = {
    id: "1",
    name: "Abstract Smoke Red Blue",
    price: 3.5,
    image:
      "https://lh3.googleusercontent.com/dg9HnUzSOEdvUd4aIO0gcHAs_Yk4UHC36l_o2pGhp7S6JbR2yxM85JU5rQOZLhmKhylfMI9X7Do6FG6Mru-EQS9Sm99BHYwtYajd=w600",
    owner: {
      name: "Jese Leos",
      joined: "August 2014",
    },
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum soluta aliquam Laborum minima officia debitis neque tempore quod earum eos perferendis veritatis, optio quas id harum. Pariatur neque eos tempora.",
  };

  return (
    <div className="w-full h-full grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 grid-cols-1  ">
      <section className="border-r-[0.1px] h-full border-opacity-75 border-Black-1 flex justify-center items-center">
        <NftAssets
          image={
            "https://ipfs.infura.io/ipfs/" + Nft?.metadata?.image ||
            "https://lh3.googleusercontent.com/dg9HnUzSOEdvUd4aIO0gcHAs_Yk4UHC36l_o2pGhp7S6JbR2yxM85JU5rQOZLhmKhylfMI9X7Do6FG6Mru-EQS9Sm99BHYwtYajd=w600"
          }
        />
      </section>
      <section className="h-full mb-14  sm:mb-12 lg:border-l-[0.1px] md:border-l-[0.1px] flex flex-col justify-between gap-10 border-none border-opacity-75 border-Black-1 lg:p-20 md:p-20 p-3">
        <div className="flex flex-col lg:flex-col md:flex-row sm:flex-col gap-10 justify-between items-start ">
          <NftHeader
            nftName={Nft?.metadata?.name || nft.name}
            owner={Nft?.owner?.name || nft.owner}
            price={Nft?.price || nft.price}
          />
          <NftExtraData
            description={Nft?.metadata?.description || nft.description}
          />
        </div>
        {Nft?.onSale ? (
          address != Nft?.owner ? (
            <section className="w-full flex justify-around mb-7">
              <FilledButton
                text={`Buy for ${Nft?.price || nft.price} ETH`}
                extra="w-2/5"
                onClick={() => openModalWithData("nft-buy", Nft, "buyNft")}
              />
              <OutlinedButton text={`Make Offer`} extra="w-2/5" />
            </section>
          ) : (
            <OutlinedButton
              onClick={() => {}}
              text={`Your Nft for sale with ${Nft?.price}`}
              extra="w-full"
            />
          )
        ) : (
          <OutlinedButton
            onClick={() => {}}
            text={`NFT NOT FOR SALE`}
            extra="w-full"
          />
        )}
      </section>
    </div>
  );
};
Nft.extraStyles = ["!py-0 md:!px-5"];

export default Nft;
