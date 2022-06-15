import React from "react";
import { Carousel } from "../global/Carousel";


export const TopCollections = ({ collections }: { collections: any }) => {
  return (
    <section className="">
      <h1 className="text-white text-3xl font-semibold my-10">Top Collections</h1>
      <Carousel items={collections} />
    </section>
  );
};
