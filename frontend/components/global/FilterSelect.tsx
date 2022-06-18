import React from "react";

export const FilterSelect = ({ setFilterType }: { setFilterType: Function }) => {
  return (
    <div className="md:w-1/5 ">
      <select
      onChange={(e) => setFilterType(e.target.value)}
        defaultValue="US"
        id="countries"
        className="text-white text-sm bg-Black-2 rounded-lg p-3 w-full outline-none"
      >
        <option value="new">Recently Listed</option>
        <option value="popular">Popular</option>
        <option value="onSale">Buy Now</option>
        <option value="notForSale">Not For Sale</option>
      </select>
    </div>
  );
};
