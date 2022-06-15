import { MarketAbi } from "@lib";
import { cute } from "@utils";
import { Router } from "express";
import { marketplaceAddress } from "@lib";
import { handlFile, ipfsClient } from "@config";
import { ICollection } from "@interfaces";
import { handleUserState } from "@controllers";
import { Collection } from "@models";

const router = Router();

router.post(
  "/",
  cute(async (req, res, next) => {
    const { address: owner, token } = req.body;
    let user = await handleUserState(owner, { address: owner });

    const collection = await Collection.create({
      address: token,
      followers: [],
      owner: user.id,
      nfts: [],
    });

    let collections = new Set(user.collections);
    collections.add(collection.id);
    user.collections = Array.from(collections);
    user = await (
      await user.save()
    ).populate({
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
  handlFile.fields([
    { name: "profile", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  cute(async (req, res, next) => {
    const { name, description }: any = req.body;
    const { cover, profile } = req?.files as {
      profile: Express.Multer.File[];
      cover: Express.Multer.File[];
    };

    const { path: profileUrl } = await ipfsClient.add(profile[0].buffer);
    const { path: coverUrl } = await ipfsClient.add(cover[0].buffer);
    // const weiPrice = ethers.utils.parseUnits(price, "ether");

    const metadata = {
      name: name,
      description: description,
      profile: profileUrl,
      cover: coverUrl,
    };

    const { path: metadataPath } = await ipfsClient.add(
      JSON.stringify(metadata)
    );

    res.json({
      url: "https://ipfs.infura.io/ipfs/" + metadataPath,
    });
  })
);

export { router as collectionRoutes };
