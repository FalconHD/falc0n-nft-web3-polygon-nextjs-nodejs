import { NextWithLayoutPage } from "@/interfaces";
import axios from "axios";
import { getNFTS } from "blockchain/nfts";
import { FilledButton } from "components/global";
import { GridCards } from "components/Grids";
import { ethers } from "ethers";
import { useBlockchain } from "hooks/useBlockchain";
import { useWallet } from "hooks/useWallet";
import React, { useCallback, useEffect, useState } from "react";

const Explore: NextWithLayoutPage = () => {
  const [nftsFeed, setNftsFeed] = useState<any>([]);
  const { contrat, setupContract } = useWallet();
  const { runner: nftsRunner, data: nfts } = useBlockchain(getNFTS);

  useEffect(() => {
    (async () => {
      await nftsRunner();
    })();
  }, [contrat]);

  const getNFTSFeed = useCallback(async () => {
    if (nfts) {
      const items = await Promise.all(
        nfts.map(async (i: any) => {
          const tokenUri = await contrat?.tokenURI(i.nftToken);
          if (!tokenUri) return;
          const { data } = await axios.get(tokenUri);
          return {
            ...i,
            price: parseFloat(ethers.utils.formatUnits(i?.price, 18)),
            metadata: data,
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
