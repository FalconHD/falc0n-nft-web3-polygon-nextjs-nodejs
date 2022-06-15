import {
  ContractRoutes,
  collectionRoutes,
  nftRoutes,
  usersRoutes,
} from "@routes";
import { app, connection, initServer } from "@config";
import { handleError, notFound } from "@middlewares";

connection(() => {
  //server init
  initServer(app);

  //routes
  app.use("/api/contract", ContractRoutes);
  app.use("/api/collection", collectionRoutes);
  app.use("/api/nft", nftRoutes);
  app.use("/api/user", usersRoutes);

  // middlewares
  app.use(notFound);
  app.use(handleError);
});
