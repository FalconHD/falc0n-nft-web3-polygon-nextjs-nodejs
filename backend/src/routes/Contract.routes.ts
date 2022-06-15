import { MarketAbi } from "@lib";
import { cute } from "@utils";
import { Router } from "express";
import { marketplaceAddress } from "@lib";

const router = Router();

router.get(
  "/",
  cute(async (req, res, next) => {
    const { address } = req.params;

    console.log(address);

    res.json({
      address: marketplaceAddress ?? "",
      abi: MarketAbi ?? {},
    });
  })
);

export { router as ContractRoutes };
