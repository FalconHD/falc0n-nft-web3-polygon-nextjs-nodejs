import { NextWithLayoutPage } from "@/interfaces";
import axios from "axios";
import { getNFTS } from "blockchain/nfts";
import { FilledButton } from "components/global";
import { GridCards } from "components/Grids";
import { ethers } from "ethers";
import { useBlockchain } from "hooks/useBlockchain";
import { useFetch } from "hooks/useFetch";
import { useWallet } from "hooks/useWallet";
import React, { useCallback, useEffect, useState } from "react";

const Explore: NextWithLayoutPage = () => {
  const [nftsFeed, setNftsFeed] = useState<any>([]);
  const { contrat, setupContract } = useWallet();
  const [fetcher] = useFetch();
  const { runner: nftsRunner, data: nfts } = useBlockchain(getNFTS);

  useEffect(() => {
    if (contrat) {
      (async () => {
        await nftsRunner();
      })();
    } else {
      setupContract();
    }
  }, [contrat]);

  const getNFTSFeed = useCallback(async () => {
    if (nfts) {
      const items = await Promise.all(
        nfts.map(async (i: any) => {
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
            price: parseFloat(ethers.utils.formatUnits(i?.price, 18)),
            metadata: data,
            likes:
              targetnft?.likes && targetnft?.likes.length > 0
                ? targetnft.likes
                : [],
          };
        })
      );
      setNftsFeed(items);
    }
  }, [nfts]);

  useEffect(() => {
    getNFTSFeed();
  }, [nfts]);

  return <GridCards id="nft" nfts={nftsFeed || []} />;
};

export default Explore;
