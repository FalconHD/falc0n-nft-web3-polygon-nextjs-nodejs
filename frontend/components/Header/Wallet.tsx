import React from "react";
import { FilledButton, OutlinedButton } from "@/components";
import { useWallet } from "@/hooks";
export const Wallet = ({
  address,
  setupContract,
}: {
  address: string | null;
  setupContract: () => void;
}) => {
  return (
    <div className="hidden lg:flex md:hidden gap-2 items-center">
      <FilledButton text="Create" to="/collection/create" />
      {address ? (
        <h1 className="text-white">{address?.slice(-4).toLocaleUpperCase()}</h1>
      ) : (
        <OutlinedButton text="Connect" onClick={() => setupContract()} />
      )}
    </div>
  );
};
