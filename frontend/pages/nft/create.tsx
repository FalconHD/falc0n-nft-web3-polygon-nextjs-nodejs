import { NextWithLayoutPage } from "@/interfaces";
import Head from "next/head";
import React from "react";
import { CreateNftProvider } from "@/formikProviders";
// import { useWallet } from "hooks";
import { FormNFT } from "@/components";

const Create: NextWithLayoutPage = () => {
  return (
    <div>
      <Head>
        <title>Create Nft</title>
        <meta name="description" content="CREATE NEW NFT IN FALC0N PLATFORM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreateNftProvider>
        <FormNFT />
      </CreateNftProvider>
    </div>
  );
};

export default Create;
