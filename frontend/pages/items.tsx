import { NextWithLayoutPage } from "@/interfaces";
import axios from "axios";
import { getAddressCollections } from "blockchain/collection";
import { getNFTbyOwner } from "blockchain/nfts";
import { Carousel } from "components/global";
import { GridCardsWithControl } from "components/Grids";
import { ethers } from "ethers";
import { useBlockchain } from "hooks/useBlockchain";
import { useFetch } from "hooks/useFetch";
import { useWallet } from "hooks/useWallet";
import React, { useCallback, useEffect, useState } from "react";

const MyItems: NextWithLayoutPage = () => {
  const [nfts, setNfts] = useState<any>(null);
  const [collections, setCollections] = useState<any>(null);
  const { contrat, address, setupContract } = useWallet();
  const [fetcher] = useFetch();
  const { data: myNftsBlocks, runner: nftsRunner } =
    useBlockchain(getNFTbyOwner);
  const { data: myCollectionsBlocks, runner: collectionsRunner } =
    useBlockchain(getAddressCollections);

  //  runner();
  useEffect(() => {
    if (contrat) {
      collectionsRunner();
      nftsRunner();
    } else {
      setupContract();
    }
  }, [contrat, address]);

  // parsers :
  const nftsParser = useCallback(async () => {
    if (myNftsBlocks) {
      console.log("before :", myNftsBlocks);

      const items = await Promise.all(
        myNftsBlocks?.map(async (i: any) => {
          console.log("uri :", i.nftToken);

          const tokenUri = await contrat?.tokenURI(i.nftToken);
          if (!tokenUri) return;
          const { data } = await axios.get(tokenUri);

          const targetnft = await fetcher({
            url: `/nft/${ethers.utils.formatUnits("" + i?.nftToken, 18)}`,
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          return {
            ...i,
            price: parseFloat(ethers.utils.formatUnits(i.price, 18)),
            metadata: data,
            likes:
              targetnft?.likes && targetnft?.likes.length > 0
                ? targetnft.likes
                : [],
          };
        })
      );
      setNfts(items);
      return items;
    }
  }, [myNftsBlocks]);

  const collectionsParser = useCallback(async () => {
    if (myCollectionsBlocks) {
      const items = await Promise.all(
        myCollectionsBlocks?.map(async (i: any) => {
          const tokenUri = i.tokenURI;
          console.log("collection parser ", tokenUri);

          if (!tokenUri) return;
          const { data } = await axios.get(tokenUri);
          return {
            ...i,
            metadata: data,
          };
        })
      );

      setCollections(items);
      return items;
    }
  }, [myCollectionsBlocks]);

  // effects :
  useEffect(() => {
    if (contrat) {
      //@ts-ignore
      nftsParser();
    }
  }, [myNftsBlocks]);
  useEffect(() => {
    if (contrat) {
      //@ts-ignore
      collectionsParser();
    }
  }, [myCollectionsBlocks]);

  useEffect(() => {
    console.log("mynfts : ", nfts);
    console.log("mycollections : ", collections);
  }, [nfts, collections]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-white text-2xl font-bold">My Collections : </h1>
      <Carousel control items={collections} />
      <h1 className="text-white text-2xl font-bold">My NFTs : </h1>
      <GridCardsWithControl nfts={nfts} id="nft" />
    </div>
  );
};

export default MyItems;
