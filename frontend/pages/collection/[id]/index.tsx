import {
  CollectionHeader,
  CollectionState,
  GridCards,
  NftFilter,
} from "@/components";
import { NextWithLayoutPage } from "@/interfaces";
import axios from "axios";
import { getCollection } from "blockchain/collection";
import { getNFTByCollection } from "blockchain/nfts";
import { ethers } from "ethers";
import { useBlockchain } from "hooks/useBlockchain";
import { useFetch } from "hooks/useFetch";
import { useWallet } from "hooks/useWallet";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";

const filterBy: { [key: string]: (arr: any) => any } = {
  new: (arr: any) =>
    arr.sort(
      (a: any, b: any) => b?.nftToken?.toString() - a?.nftToken?.toString()
    ).reverse(),
  popular: (arr: any) =>
    arr.sort((a: any, b: any) => b?.likes?.length - a?.likes?.length),
  onSale: (arr: any) => arr.filter((i: any) => i.onSale),
  notForSale: (arr: any) => arr.filter((i: any) => !i.onSale),
};

const CollectionItem: NextWithLayoutPage = () => {
  const [collection, setCollection] = useState<any | null>(null);
  const [filterType, setFilterType] = useState<string>("new");
  const [collectionNfts, setCollectionNfts] = useState<any | null>(null);
  const [filtredNfts, setFiltredNfts] = useState<any | null>(null);
  const [filterBySearch, setFilterBySearch] = useState<any | null>(null);
  const [fetcher, { data: owner }] = useFetch();
  const { contrat, address, setupContract } = useWallet();
  const {
    data: BlockCollection,
    error,
    isError,
    loading,
    runner,
  } = useBlockchain(getCollection);
  const { data: nftsCollectionBlock, runner: nftsRunner } =
    useBlockchain(getNFTByCollection);
  const {
    query: { id },
  } = useRouter();

  //runnnners :
  const getCollectionById = useCallback(
    async (id: string) => {
      await runner(id);
    },
    [contrat, address, id]
  );

  const getNftsCollection = useCallback(async () => {
    await nftsRunner(BlockCollection.collectionToken);
  }, [contrat, address, BlockCollection]);

  // parsers :
  const nftsParser = useCallback(async () => {
    if (nftsCollectionBlock) {
      const items = await Promise.all(
        nftsCollectionBlock?.map(async (i: any) => {
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
      setCollectionNfts(items);
    }
  }, [collection?.nfts]);

  const collectionParser = async (collection: any) => {
    const tokenUri = collection.tokenURI;
    if (!tokenUri) return;
    const { data } = await axios.get(tokenUri);

    const { user: owner } = await fetcher({
      url: `/user/${collection?.creator}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setCollection({
      ...collection,
      floor_price: parseFloat(
        ethers.utils.formatUnits(collection.floor_price, 18)
      ),
      metadata: data,
      owner,
    });
  };

  // effects :
  useEffect(() => {
    if (contrat && id) {
      //@ts-ignore
      getCollectionById(id);
    }
  }, [contrat, address, id]);

  useEffect(() => {
    if (contrat && BlockCollection) {
      getNftsCollection();
    } else {
      setupContract();
    }
  }, [contrat, address, BlockCollection]);

  useEffect(() => {
    if (BlockCollection) {
      collectionParser(BlockCollection);
    }
  }, [BlockCollection]);

  useEffect(() => {
    if (collection && nftsCollectionBlock) {
      nftsParser();
    }
  }, [collection]);

  useEffect(() => {
    if (collectionNfts) {
      let filterd = filterBy[filterType](collectionNfts);
      console.log(filterd);

      if (filterBySearch) {
        filterd = filterd.filter((i: any) => {
          return i?.metadata?.name
            ?.toLowerCase()
            ?.includes(filterBySearch?.toLowerCase());
        });
      }
      setFiltredNfts(filterd);
    }
    return () => {
      setFiltredNfts(null);
    };
  }, [filterType, collectionNfts, filterBySearch]);

  return (
    <>
      <CollectionHeader
        cover={
          "https://ipfs.infura.io/ipfs/" + collection?.metadata?.cover ||
          "https://images.pexels.com/photos/2719301/pexels-photo-2719301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        image={
          "https://ipfs.infura.io/ipfs/" + collection?.metadata?.profile ||
          "https://renga.imgix.net/token/winter/2/18.jpg"
        }
        name={collection?.metadata?.name || "Collection"}
      />
      <CollectionState collection={collection} />
      <div className="lg:px-20 md:px-20 mt-5">
        <NftFilter
          setFilterBySearch={setFilterBySearch}
          setFilterType={setFilterType}
        />
        <GridCards nfts={filtredNfts || collectionNfts} id="nft" />
      </div>
    </>
  );
};

export default CollectionItem;
