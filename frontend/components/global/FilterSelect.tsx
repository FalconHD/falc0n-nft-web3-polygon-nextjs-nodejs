import React from "react";

export const FilterSelect = () => {
  return (
    <div className="md:w-1/5 ">
      <select
        defaultValue="US"
        id="countries"
        className="text-white text-sm bg-Black-2 rounded-lg p-3 w-full outline-none"
      >
        <option value="US">Recently Listed</option>
        <option value="popular">Popular</option>
        <option value="FR">Buy Now</option>
        <option value="DE">Not For Sale</option>
      </select>
    </div>
  );
};
