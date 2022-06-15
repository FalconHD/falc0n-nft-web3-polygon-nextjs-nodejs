import React, { useRef, useState } from "react";
import { SellerCard } from "./SellerCard";
import { SellerCardWithControl } from "./SellerCardWithControl";

export const Carousel = ({
  items,
  control = false,
}: {
  items: Array<any>;
  control?: boolean;
}) => {
  const ItemContainerRef = useRef<Element | null>(null);
  // b => beginning | m => middle | e => end
  const [ScrollInd, setScrollInd] = useState("b");
  return (
    <section className="relative">
      <div className="flex flex-end gap-1 w-full">
        <button
          className="absolute top-[43%] right-0 translate-x-2 z-10"
          onClick={() => {
            if (ItemContainerRef.current) {
              ItemContainerRef?.current.scroll({
                left: ItemContainerRef?.current.scrollLeft + 220,
                behavior: "smooth",
              });
            }
          }}
        >
          <svg
            className="w-10 h-10 text-white border-2 border-white rounded-full p-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <button
          className="absolute top-[43%] left-0 z-10"
          onClick={() => {
            if (ItemContainerRef.current) {
              ItemContainerRef.current.scroll({
                left: ItemContainerRef.current.scrollLeft - 220,
                behavior: "smooth",
              });
            }
          }}
        >
          <svg
            className="w-10 h-10 text-white border-2 border-white rounded-full"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className="flex justify-start items-center gap-8 px-3 w-full overflow-scroll no-scrollbar"
        ref={ItemContainerRef as any}
        onScroll={(e) => {
          const { scrollWidth, scrollLeft, offsetWidth } =
            e.target as HTMLTextAreaElement;
          const SL = Math.ceil(scrollLeft + offsetWidth);
          if (scrollLeft <= 0) setScrollInd("b");
          if (scrollLeft > 0 && scrollLeft < scrollWidth) setScrollInd("m");
          if (SL >= scrollWidth) setScrollInd("e");
        }}
      >
        {items?.length > 0
          ? items.map((item: any, idx) =>
              control ? (
                <SellerCardWithControl key={idx} item={{ ...item, id: idx }} />
              ) : (
                <SellerCard key={idx} item={{ ...item, id: idx }} />
              )
            )
          : Array(10)
              .fill(0)
              .map((e, idx) => (
                <div
                  key={idx}
                  className="border border-grayDark flex flex-col gap-4 items-center justify-between shadow rounded-md p-4 max-w-sm min-w-[150px] w-48  mx-auto"
                >
                  <div className="rounded-full bg-slate-700 h-10 w-10" />
                  <div className="animate-pulse flex space-x-4 w-full">
                    <div className="flex-1 space-y-6 py-1">
                      <div className="h-2 bg-slate-700 rounded w-full" />
                      <div className="space-y-3 w-full">
                        <div className="grid grid-cols-3 gap-2 w-full">
                          <div className="h-2 bg-slate-700 rounded col-span-2" />
                          <div className="h-2 bg-slate-700 rounded col-span-1" />
                        </div>
                        <div className="h-2 bg-slate-700 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
      </div>
    </section>
  );
};
