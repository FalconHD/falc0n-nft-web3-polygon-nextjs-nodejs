import { NextWithLayoutPage } from "@/interfaces";
import { FormCollection } from "@/components";
import Head from "next/head";
import React from "react";
import { CreateCollectionProvider } from "@/formikProviders";

const Create: NextWithLayoutPage = () => {


  return (
    <div>
      <Head>
        <title>Create Nft</title>
        <meta name="description" content="CREATE NEW NFT IN FALC0N PLATFORM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreateCollectionProvider>
        <FormCollection />
      </CreateCollectionProvider>
    </div>
  );
};

export default Create;
