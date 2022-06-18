import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { Header } from "../Header";
import { Footer } from "../footer";
import { setContract, setUser } from "@/slices";
import { useWallet, useModal, useSlice, useFetch } from "@/hooks";
import axios from "axios";

export const Layout = ({
  children,
  extraStyles = [""],
}: {
  children: ReactNode;
  extraStyles?: string[];
}): JSX.Element => {
  const [styles, setStyle] = useState([""]);
  const [contract, dispatch] = useSlice("Contract");
  const [fetcher, { data, loading, error, isError }] = useFetch();
  const [modalState, openModalWithData, closeModal] = useModal();
  const { address, setupContract, isMetaInsttaled, avatar } = useWallet();
  useEffect(() => {
    if (isMetaInsttaled) {
      // link contract abi and address to the application:
      (async () => {
        await fetcher({
          method: "GET",
          url: "/contract/" + address,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })();

      //setup contract when evenst Fired
      window.ethereum?.on("accountsChanged", () => {
        setupContract();
      });

      window.ethereum?.on("chainChanged", () => {
        setupContract();
      });
    } else {
      openModalWithData("MetaMaskNotInstalled");
    }
  }, [isMetaInsttaled, address]);

  // useEffect(() => {
  //   if (address) {
  //     (async () => {
  //       let { data } = await axios({
  //         method: "GET",
  //         url:
  //           process.env.NODE_ENV == "development"
  //             ? process.env.NEXT_PUBLIC_BACKEND_URL + "/user/" + address
  //             : process.env.NEXT_PUBLIC_BACKEND_URL_PROD + "/user/" + address,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       console.log("usssss :", data);
  //     })();
  //   }
  // }, [address]);

  useEffect(() => {
    if (isError) {
      setStyle(["grayscale cursor-not-allowed"]);
    } else if (data) {
      setStyle([""]);
      dispatch(setContract({ abi: data.abi, address: data.address }));
      dispatch(setUser(data?.user));
    }
  }, [data, isError]);

  return (
    <div className="w-full  min-h-screen flex flex-col justify-between bg-Dark z-40 ">
      <Header address={address} setupContract={setupContract} />
      <main
        className={`lg:px-32 md:px-32 py-5 px-5 h-full ${extraStyles.join(
          " "
        )} ${styles.join(" ")}`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};
