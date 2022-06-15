import React from "react";
import styles from "./banners.module.css";

export const HomeBanner = () => {
  return (
    <div
      className={`${styles.banner__home} flex justify-center items-center lg:text-5xl md:lg:text-4xl p-10 text-lg lg:px-32 lg:py-20 md:px-32 md:py-20 font-bold text-white `}
    >
      <h1>Discover, collect, and sell extraordinary NFTs</h1>
    </div>
  );
};
