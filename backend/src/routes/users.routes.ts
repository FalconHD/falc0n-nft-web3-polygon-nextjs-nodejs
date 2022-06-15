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

router.post(
  "/:address",
  cute(async (req, res, next) => {
    const user = await handleUserState(req.params.address, req.body);

    res.json({
      User: user,
    });
  })
);

export { router as usersRoutes };
