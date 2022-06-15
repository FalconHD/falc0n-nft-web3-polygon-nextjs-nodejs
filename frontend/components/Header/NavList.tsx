import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const NAV_LINKS = [
  {
    link: "/explore",
    text: "Explore",
  },
  {
    link: "/items",
    text: "My Items",
  },
  {
    link: "/following",
    text: "Following",
  },
];

export const NavList = () => {
  const router = useRouter();

  return (
    <div
      className="hidden justify-between items-center w-full md:flex md:w-auto "
      id="mobile-menu-3"
    >
      <div className="relative mt-3 md:hidden">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          id="search-navbar"
          className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
        />
      </div>
      <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
        {NAV_LINKS.map(({ link, text }) => (
          <li key={link}>
            <Link href={link}>
              <h3
                className={`block mt-4 md:inline-block md:mt-0 cursor-pointer ${
                  router.pathname == link ? "text-grayLight" : "text-grayDark"
                }`}
              >
                {text}
              </h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
