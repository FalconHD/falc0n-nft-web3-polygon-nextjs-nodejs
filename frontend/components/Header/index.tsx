import { SearchBar } from "components/global";
import React from "react";
import { Logo } from "./Logo";
import { NavList } from "./NavList";
import { Wallet } from "./Wallet";

export const Header = ({
  address,
  setupContract,
}: {
  address: string | null;
  setupContract: () => void;
}) => {
  return (
    <nav className="px-2 sm:px-4 py-5 border-b-[0.1px] border-opacity-75 border-Black-1">
      <div className=" flex flex-wrap justify-between items-center px-auto lg:px-20 md:px-7 gap-10 ">
        <Logo />
        <SearchBar />
        <NavList />
        <Wallet address={address} setupContract={setupContract} />
      </div>
    </nav>
  );
};
