import { NextWithLayoutPage } from "@/interfaces";
import Head from "next/head";
import React, { useEffect } from "react";
import { CreateNftProvider } from "@/formikProviders";
// import { useWallet } from "hooks";
import { FormNFT } from "@/components";
import { useRouter } from "next/router";

const Create: NextWithLayoutPage = () => {
  const {
    query: { collection },
  } = useRouter();

  useEffect(() => {
    console.log(collection);
  }, [collection]);
  return (
    <div>
      <Head>
        <title>Create Nft</title>
        <meta name="description" content="CREATE NEW NFT IN FALC0N PLATFORM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreateNftProvider>
        <FormNFT fromQuery={collection?.toString().replace("-", " ")} />
      </CreateNftProvider>
    </div>
  );
};

export default Create;
