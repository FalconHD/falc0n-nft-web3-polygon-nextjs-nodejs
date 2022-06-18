import React from "react";
import { FilledButton, OutlinedButton } from "@/components";
import { useSlice, useWallet } from "@/hooks";
import Link from "next/link";
export const Wallet = ({
  address,
  setupContract,
}: {
  address: string | null;
  setupContract: () => void;
}) => {
  const [{ user }] = useSlice("contract");

  return (
    <div className="hidden lg:flex md:hidden gap-2 items-center">
      <FilledButton text="Create" to="/collection/create" />
      {address ? (
        <Link href="/profile">
          <img
            className="w-10 h-10 p-1 rounded-full ring-2 ring-primary cursor-pointer "
            src={
              user?.avatar
                ? "https://ipfs.infura.io/ipfs/" + user?.avatar
                : "https://picsum.photos/200/300"
            }
            alt="Bordered avatar"
          />
        </Link>
      ) : (
        // {/* <h1 className="text-white">{address?.slice(-4).toLocaleUpperCase()}</h1> */}
        <OutlinedButton text="Connect" onClick={() => setupContract()} />
      )}
    </div>
  );
};
