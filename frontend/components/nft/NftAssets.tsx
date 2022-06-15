import Image from "next/image";
import React from "react";

export const NftAssets = ({ image }: { image: string }) => {
  return (
    <div className="relative w-2/3 shadow-xl">
      <Image
        priority
        width={500}
        height={500}
        className="rounded-xl"
        objectFit="contain"
        src={
          image ||
          "https://lh3.googleusercontent.com/dg9HnUzSOEdvUd4aIO0gcHAs_Yk4UHC36l_o2pGhp7S6JbR2yxM85JU5rQOZLhmKhylfMI9X7Do6FG6Mru-EQS9Sm99BHYwtYajd=w600"
        }
        layout="responsive"
      />
    </div>
  );
};
