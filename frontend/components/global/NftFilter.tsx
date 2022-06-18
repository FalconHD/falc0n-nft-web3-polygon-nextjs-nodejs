import React from "react";
import { SearchBar, FilterSelect } from ".";

export const NftFilter = ({ setFilterType , setFilterBySearch}: { setFilterType: Function,setFilterBySearch: Function }) => {
  return (
    <div className="hidden gap-5 lg:flex md:flex justify-center items-center py-10">
      <SearchBar setFilterBySearch={setFilterBySearch} />
      <FilterSelect setFilterType={setFilterType} />
    </div>
  );
};
