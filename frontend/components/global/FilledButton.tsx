import React from "react";
import { IButton } from "@/interfaces";
import Link from "next/link";

export const FilledButton = ({
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
        text-sm 
        bg-gradient-to-r 
        from-primary 
        via-[#EB1484]
        to-[#C81CC5]
        flex items-center 
        justify-center
        px-6 py-2
        rounded-lg
      text-white
        ${extra}
      `}
    >
      {typeof text == "string" ? text : text()}
    </button>
  );

  return !onClick ? <Link href={to}>{element()}</Link> : element();
};
