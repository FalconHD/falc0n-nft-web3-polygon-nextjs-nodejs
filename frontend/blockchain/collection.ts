import { IRequest } from "@/interfaces";
import { setUser } from "@/slices";
import { BigNumber, Contract, ethers } from "ethers";

type fetcherType = ({ url, method, body, headers }: IRequest) => Promise<void>;
type IcbBlockChain = {
  contract: Contract | null;
  fetcher: fetcherType;
  data: any;
  args: FormData | any;
  dispatch: any;
  address: string;
};
export const createCollection = async ({
  contract,
  fetcher,
  args,
  dispatch,
  address,
}: IcbBlockChain) => {
  let res: any = await fetcher({
    url: "/collection/create",
    method: "POST",
    body: args,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const transaction = await contract?.createCollection(res?.url);

  const receipt = await transaction.wait();
  //@ts-ignore
  let { user } = await fetcher({
    url: "/collection",
    method: "POST",
    body: JSON.stringify({
      token: ethers.utils.formatUnits(
        "" + receipt?.events[0]?.args?.collectionToken,
        18
      ),
      address,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  dispatch(setUser(user));
  return receipt?.events[0]?.args;
};

export const getCollections = async ({ contract }: IcbBlockChain) => {
  return await contract?.getCollections();
};

export const getAddressCollections = async ({ contract }: IcbBlockChain) => {
  return await contract?.getCollectionByOwner();
};

export const getCollection = async ({ args, contract }: IcbBlockChain) => {
  return await contract?.getCollection(BigNumber.from(args));
};

export const addOwner = async ({ contract, args }: IcbBlockChain) => {
  const {
    extra: { owner },
    collectionToken,
  } = args;
  const transaction = await contract?.addOwner(owner, collectionToken);
  const receipt = await transaction.wait();
  return receipt;
};
