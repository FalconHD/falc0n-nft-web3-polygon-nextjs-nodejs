import { INft } from "@/interfaces";
import { Add_Owner } from "./add_owner";
import { Buy_Nft } from "./buy_Nft";
import { List_nft } from "./list_nft";
import { MetaMaskNotInstalled } from "./MetaMaskNotInstalled";
import { Sell_Nft } from "./sell_Nft";
import { Unlist_nft } from "./unlist_nft";

export const TEMPLATES: { [key: string]: Function } = {
  "nft-sell": (nft: INft) => <Sell_Nft nft={nft} />,
  "nft-buy": (nft: INft) => <Buy_Nft nft={nft} />,
  add_owner: (collection: any) => <Add_Owner collection={collection} />,
  list_nft: (nft: any) => <List_nft nft={nft} />,
  unlist_nft: (nft: any) => <Unlist_nft nft={nft} />,
  MetaMaskNotInstalled: () => <MetaMaskNotInstalled />,
};
export const HEADERS: { [key: string]: string } = {
  "nft-sell": "Sell NFT",
  "nft-buy": "Buy NFT",
  add_owner: "Add Owner",
  list_nft: "Listing Nft",
  unlist_nft: "Unlisting Nft",
  MetaMaskNotInstalled: "MetaMask is not installed",
};

export const ACTIONS: { [key: string]: (props?: any, extra?: any) => void } = {
  "nft-sell": (props) => {},
  "nft-buy": async (props) => {
    await props.runner(props?.nft);
  },
  add_owner: async (props, extra) => {
    await props?.runner({ ...props?.nft, extra });
  },
  list_nft: async (props, extra) => {
    await props?.runner({ ...props?.nft, extra });
  },
  unlist_nft: async (props) => {
    await props?.runner({ ...props?.nft });
  },
  MetaMaskNotInstalled: () => {
    window.open("https://metamask.io/download/", "_blank");
  },
};
