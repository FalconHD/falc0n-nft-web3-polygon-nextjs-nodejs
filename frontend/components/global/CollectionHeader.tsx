import { ICollection } from "@/interfaces";
import Image from "next/image";
import React from "react";

export const CollectionHeader = ({ cover, image }: ICollection) => {
  return (
    <div className="relative flex flex-col justify-center items-center mb-28 lg:mb-32 md:mb-32">
      <div
        className="w-full lg:h-64 md:h-44 sm:h-48 h-52 rounded-2xl"
        style={{
          backgroundImage: `url(${cover})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      ></div>
      <span className="absolute flex justify-start w-40 lg:w-52 md:w-52 sm:w-52 lg:h-52 md:h-52 sm:h-52 h-40 lg:translate-y-32 md:translate-y-20 sm:translate-y-20  translate-y-28 rounded-full overflow-hidden border-8 border-Dark bg-grayLight">
        <Image
          layout="fill"
          objectFit="cover"
          className=""
          src={image ?? "https://renga.imgix.net/token/winter/2/18.jpg"}
        />
      </span>
    </div>
  );
};
