import { Logo } from "components/Header/Logo";
import React from "react";
import { FilledButton } from "..";

export const Footer = () => {
  return (
    <footer className="flex flex-col lg:px-32 md:px-20">
      <section className="py-8 border-t-[0.1px] border-opacity-75 border-Black-1 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-10">
        <div className="flex flex-col gap-5 lg:px-10 md:px-10 sm:px-6  px-3">
          <Logo />
          <h1 className="text-white font-bold text-xl">
            Get The Latest Updates
          </h1>
          <div className=" w-full">
            <div className="relative flex items-center">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                className="block p-2 pl-10 text-white bg-Black-2 rounded-xl w-full outline-none"
                placeholder="name@falc0n.exe"
              />
              <FilledButton
                text="Email Me!"
                extra="absolute right-0 top-[4.5%] "
              />
            </div>
          </div>
        </div>
        <div className="flex justify-around gap-5 lg:px-10 md:px-2 px-1">
          <div className="flex flex-col gap-3 text-white">
            <h1 className="font-bold text-xl">Falc0n.exe</h1>
            <h3>Explore</h3>
            <h3>How it Works</h3>
            <h3>Contact Us</h3>
          </div>
          <div className="flex flex-col gap-3 text-white">
            <h1 className="font-bold text-xl">Support</h1>
            <h3>Help center</h3>
            <h3>Terms of service</h3>
            <h3>Privacy Policy</h3>
          </div>
        </div>
      </section>
      <section className="py-8 border-t-[0.1px] border-opacity-75 border-Black-1 flex flex-col lg:flex-row ms:flex-row justify-between gap-5 items-center ">
        <div className="text-lg font-semibold text-white lg:px-10 md:px-2 px-1">
          Falcon &copy; All Rights Reserved
        </div>
        <div className="flex gap-5 lg:px-10 md:px-2 px-1 lg:mr-12 md:mr-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={25}
            height={25}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-instagram text-white"
          >
            <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={25}
            height={25}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-twitter text-white"
          >
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={25}
            height={25}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-twitch text-white"
          >
            <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7" />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={25}
            height={25}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-anchor text-white"
          >
            <circle cx={12} cy={5} r={2} />
            <line x1={12} y1={22} x2={12} y2={8} />
            <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
          </svg>
        </div>
      </section>
    </footer>
  );
};
