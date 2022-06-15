import { IButton } from "@/interfaces";
import Link from "next/link";
import React from "react";

export const OutlinedButton = ({
  text,
  to = "/",
  extra = "",
  onClick,
}: IButton) => {
  const element = () => (
    <button
      onClick={onClick || (() => {})}
      className={`
          box-border 
          text-sm bg-transparent 
          border-2 
          border-primary   
          flex items-center 
          justify-center 
          px-6 py-2 
          rounded-lg 
        text-primary
          ${extra}
        `}
    >
      {typeof text == "string" ? text : text()}
    </button>
  );
  return !onClick ? <Link href={to}>{element()}</Link> : element();
};
