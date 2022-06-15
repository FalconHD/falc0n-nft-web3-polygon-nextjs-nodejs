import { MarketAbi } from "@lib";
import { cute } from "@utils";
import { Router } from "express";
import { create } from "ipfs-http-client";
import { marketplaceAddress } from "@lib";
import { handlFile, ipfsClient } from "@config";
import { ethers } from "ethers";
import { ICollection } from "@interfaces";
import { handleUserState } from "@controllers";
import { Collection, Nft } from "@models";

// https://ipfs.infura.io:5001/api/v0
// const ipfsClient = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const router = Router();

router.post(
  "/",
  cute(async (req, res, next) => {
    const { address: owner, token, collection } = req.body;
    let user = await handleUserState(owner, { address: owner });

    const nft = await Nft.create({
      address: token,
      likes: [],
      owner: user.id,
    });

    console.log(nft);

    const targetedCollection = await Collection.findOneAndUpdate(
      {
        address: "" + collection,
      },
      {
        $addToSet: {
          //@ts-ignore
          nfts: nft._id.toString(),
        },
      },
      { new: true }
    );

    console.log(targetedCollection);

    user = await user.populate({
      path: "collections",
      populate: {
        path: "nfts",
      },
    });
    res.json({
      user,
    });
  })
);

router.post(
  "/create",
  handlFile.fields([{ name: "image", maxCount: 1 }]),
  cute(async (req, res, next) => {
    const { name, description }: ICollection = req.body;

    const { image } = req?.files as {
      image: Express.Multer.File[];
    };

    const { path: imageNft } = await ipfsClient.add(image[0].buffer);
    // const weiPrice = ethers.utils.parseUnits(price, "ether");

    const metadata = {
      name: name,
      description: description,
      image: imageNft,
    };

    const { path: metadataPath } = await ipfsClient.add(
      JSON.stringify(metadata)
    );

    res.json({
      url: "https://ipfs.infura.io/ipfs/" + metadataPath,
    });
  })
);

export { router as nftRoutes };
