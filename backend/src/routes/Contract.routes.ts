import { MarketAbi } from "@lib";
import { cute } from "@utils";
import { Router } from "express";
import { marketplaceAddress } from "@lib";
import { User } from "@models";
import { handleUserState } from "@controllers";

const router = Router();

router.get(
  "/:address",
  cute(async (req, res, next) => {
    const { address } = req.params;

    const user = await handleUserState(address);

    console.log(address);

    res.json({
      address: marketplaceAddress ?? "",
      abi: MarketAbi ?? {},
      user,
    });
  })
);

export { router as ContractRoutes };
