import Link from "next/link";
import React from "react";
import styles from "./Header.module.css";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center justify-start hover:cursor-pointer ">
        <div className={styles.logo}>
          <h2 className="text-3xl flex items-center gap-2">
            <span>
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                />
              </svg>
            </span>
            Falc0n
          </h2>
        </div>
      </div>
    </Link>
  );
};
