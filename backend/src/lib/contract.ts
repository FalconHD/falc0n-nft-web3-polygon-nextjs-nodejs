import { ethers, Signer } from "ethers";
import { FirebaseError } from "firebase/app";
import fs from "fs";
import { NFTMarket as NFTMarketType } from "typechain-types/contracts/NFTMarket";
import { marketplaceAddress } from "./config";

export const GlobalNFTMarketInterface = JSON.parse(
  fs.readFileSync("./artifacts/contracts/NFTMarket.sol/NFTMarket.json", "utf8")
);

export const MarketAbi: NFTMarketType = GlobalNFTMarketInterface.abi;


// export const NFTMarket = (signer: Signer) =>
//   new ethers.Contract(marketplaceAddress, MarketAbi, signer.provider);

