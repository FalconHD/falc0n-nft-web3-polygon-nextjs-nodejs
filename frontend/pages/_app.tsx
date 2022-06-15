import "../styles/globals.css";
import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { Layout, Modal } from "@/components";
import { Provider } from "react-redux";
import { NextWithLayoutPage } from "@/interfaces";
import { store } from "@/store";
import { useFetch } from "hooks/useFetch";
import { useSlice } from "hooks/reduxHooks";
import { setContract } from "@/slices";

type AppPropsWithLayout = AppProps & {
  Component?: NextWithLayoutPage;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  

  return (
    <Provider store={store}>
      <Layout extraStyles={Component.extraStyles || [""]}>
        <Component {...pageProps} />
        <Modal />
      </Layout>
    </Provider>
  );
}

export default MyApp;
