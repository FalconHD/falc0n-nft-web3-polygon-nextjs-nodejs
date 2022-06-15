import React, { useState } from "react";

export const NftExtraData = ({ description }: { description: string }) => {
  const [active, setActive] = useState("details");

  return (
    <section className="w-full flex flex-col gap-4 h-40">
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-500 ">
        <ul className="flex flex-wrap -mb-px">
          <li
            className="mr-2 cursor-pointer"
            onClick={() => setActive("details")}
          >
            <a
              className={`inline-block p-4 rounded-t-lg border-b-2 ${
                active == "details"
                  ? "active text-white border-white"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300"
              }`}
            >
              Details
            </a>
          </li>
          <li
            className="mr-2 cursor-pointer"
            onClick={() => setActive("offers")}
          >
            <a
              className={`inline-block p-4 rounded-t-lg border-b-2 ${
                active == "offers"
                  ? "active text-white border-white"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300"
              }`}
              aria-current="page"
            >
              Offers
            </a>
          </li>
          <li
            className="mr-2 cursor-pointer"
            onClick={() => setActive("history")}
          >
            <a
              className={`inline-block p-4 rounded-t-lg border-b-2 ${
                active == "history"
                  ? "active text-white border-white"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300"
              }`}
            >
              History
            </a>
          </li>
        </ul>
      </div>
      <div className=" max-h-64 min-h-65 overflow-y-scroll">
        {active == "details" ? (
          <p className="text-white break-all">{description}</p>
        ) : (
          <h1>offers</h1>
        )}
      </div>
    </section>
  );
};
