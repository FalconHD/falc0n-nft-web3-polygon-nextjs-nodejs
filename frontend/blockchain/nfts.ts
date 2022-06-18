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

export const getNFTS = async ({ contract }: IcbBlockChain) => {
  return await contract?.getNFTs();
};

export const createNFT = async ({
  fetcher,
  address,
  dispatch,
  args,
  contract,
  data,
}: IcbBlockChain) => {
  console.log(args);

  let res: any = await fetcher({
    url: "/nft/create",
    method: "POST",
    body: args.formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const price = ethers.utils.parseUnits("" + args.price, "ether");
  const hexCollection = ethers.utils.formatUnits(
    BigNumber.from(args.collection)
  );
  const collection = BigNumber.from(args.collection);

  let transaction = await contract?.createNFTItem(res?.url, price, collection);
  const receipt = await transaction.wait();

  //@ts-ignore
  let { user } = await fetcher({
    url: "/nft",
    method: "POST",
    body: JSON.stringify({
      token: ethers.utils.formatUnits(
        "" + receipt?.events[1]?.args?.nftToken,
        18
      ),
      address,
      collection: hexCollection,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(user);

  dispatch(setUser(user));

  return receipt?.events[0]?.args;
};

export const getNFTByCollection = async ({
  fetcher,
  address,
  dispatch,
  args,
  contract,
  data,
}: IcbBlockChain) => {
  return contract?.getNFTByCollection(BigNumber.from(args));
};

export const getNftById = async ({
  fetcher,
  address,
  dispatch,
  args,
  contract,
  data,
}: IcbBlockChain) => {
  return await contract?.getNFT(BigNumber.from(args));
};

export const buyNft = async ({
  fetcher,
  address,
  dispatch,
  args,
  contract,
  data,
}: IcbBlockChain) => {
  try {
    const price = ethers.utils.parseEther("" + args.price);
    const token = BigNumber.from(args.nftToken);
    let transaction = await contract?.buyNFT(token, {
      value: price,
    });
    const receipt = await transaction.wait();
    return receipt?.events[0]?.args;
  } catch (error: any) {
    let res = error
      .toString()
      .match(/(?<=reason="\s*).*?(?=\s*",)/gs)[0]
      .match(/(?<='\s*).*?(?=\s*')/gs);
    console.log(res);
  }
};

export const getNFTbyOwner = async ({
  fetcher,
  address,
  dispatch,
  args,
  contract,
  data,
}: IcbBlockChain) => {
  return await contract?.getNFTbyOwner();
};

export const listNFT = async ({
  fetcher,
  address,
  dispatch,
  args,
  contract,
  data,
}: IcbBlockChain) => {
  const {
    extra: { price },
    price: oldPrice,
    nftToken,
  } = args;

  console.log("all :", args);
  const currentPrice = ethers.utils.parseUnits(
    oldPrice != price ? "" + price : "" + oldPrice,
    "ether"
  );

  let transactionPrice = await contract?.setNFTPrice(currentPrice, nftToken);
  await transactionPrice.wait();
  const transactionOnsale = await contract?.setOnSaleNFT(nftToken, true);
  const result = await transactionOnsale.wait();
  return result;
};

export const unlistNFT = async ({
  fetcher,
  address,
  dispatch,
  args,
  contract,
  data,
}: IcbBlockChain) => {
  const { nftToken } = args;
  const transaction = await contract?.setOnSaleNFT(nftToken, false);
  const result = await transaction.wait();
  return result;
};

export const fetchMarketTransactions = async ({
  args,
  contract,
}: IcbBlockChain) => {
  return await contract?.fetchMarketTransactions();
};
