import { MarketAbi } from "@lib";
import { cute } from "@utils";
import { Router } from "express";
import { create } from "ipfs-http-client";
import { marketplaceAddress } from "@lib";
import { handlFile } from "@config";
import { ethers } from "ethers";
import { ICollection } from "@interfaces";
import { User } from "@models";
import { handleUserState } from "@controllers";

const projectId = "2A7w9VDHoStSf2GY97qR9hRr7WT";
const projectSecret = "73483f05e1e3a56adbf5a2d864144af3";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
const ipfsClient = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const router = Router();

router.get(
  "/:address",
  cute(async (req, res, next) => {
    const user = await (
      await handleUserState(req.params.address, req.body)
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
  "/:address",
  handlFile.fields([{ name: "image", maxCount: 1 }]),
  cute(async (req, res, next) => {
    const { name } = req.body;
    await handleUserState(req.params.address);

    const { image } = req?.files as {
      image: Express.Multer.File[];
    };

    let avatar: string | null = null;
    if (image) {
      const { path: profileUrl } = await ipfsClient.add(image[0].buffer);
      console.log(profileUrl);

      avatar = profileUrl;
    }
    console.log(name, avatar);

    const updatedUser = await (
      await User.findOneAndUpdate(
        { address: req.params.address },
        { name, avatar },
        { new: true }
      )
    ).populate({
      path: "collections",
      populate: {
        path: "nfts",
      },
    });

    res.json({
      user: updatedUser,
    });
  })
);

export { router as usersRoutes };
