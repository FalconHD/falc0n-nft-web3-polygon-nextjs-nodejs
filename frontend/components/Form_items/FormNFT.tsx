import { useFormikContext } from "formik";
import { addNFTValues } from "@/formikProviders";
import React, { useCallback, useEffect, useState } from "react";
import { UploadFile } from "./UploadFile";
import { FilledButton } from "..";
import { GlobalInput } from "components/global/GlobalInput";
import Image from "next/image";
import { ImagePreviewer, OutlinedButton } from "components/global";
import { useWallet } from "hooks/useWallet";
import { useBlockchain } from "hooks/useBlockchain";
import { getAddressCollections } from "blockchain/collection";
import axios from "axios";
import { ethers } from "ethers";

const LoadingEffect = () => (
  <svg
    role="status"
    className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentFill"
    />
  </svg>
);

export const FormNFT = ({ fromQuery }: { fromQuery?: string }) => {
  const { address, contrat, setupContract } = useWallet();
  const [collections, setCollections] = useState<any>([]);
  const [activeFromQuery, setActiveFromQuery] = useState<any>("");
  const { runner, data, error, isError, loading } = useBlockchain(
    getAddressCollections
  );
  const {
    values,
    handleChange,
    dirty,
    submitForm,
    errors,
    submitCount,
    isSubmitting,
    setFieldValue,
  } = useFormikContext<addNFTValues>();

  useEffect(() => {
    if (fromQuery) {
      const finded = collections.find(
        (collection: any) => collection?.metadata?.name === fromQuery
      );
      setActiveFromQuery(finded?.collectionToken?.toString());
    }
  }, [fromQuery, collections]);

  const getCollectionsMemo = useCallback(async () => {
    if (contrat) {
      await runner(address);
    } else {
      setupContract();
    }
  }, [address, contrat]);

  const resolveMetadata = async (collections: any) => {
    console.log("resolveMetadata", collections);

    const items = await Promise.all(
      collections.map(async (i: any) => {
        const tokenUri = i.tokenURI;
        console.log("ttt", i.tokenURI);

        if (!tokenUri) return;
        const { data } = await axios.get(tokenUri);

        return {
          ...i,
          metadata: data,
        };
      })
    );

    setCollections(items);
  };

  useEffect(() => {
    if (data) {
      resolveMetadata(data);
    } else {
      getCollectionsMemo();
    }
  }, [data]);

  useEffect(() => {
    getCollectionsMemo();
  }, [address, contrat]);

  useEffect(() => {
    console.log(values);
    console.log(errors);
  }, [values, errors]);

  return (
    <div className="flex flex-col justify-between items-center gap-6 lg:px-60 md:px-20 px-2">
      <h1 className="text-white w-full font-bold lg:text-2xl md:text-xl sm:text-lg text-md ">
        Create new Item
      </h1>
      <h1 className="text-white w-full font-semibold lg:text-xl md:text-xl sm:text-lg text-md">
        NFT Item
      </h1>

      {values.image ? (
        <ImagePreviewer
          name="image"
          setFieldValue={setFieldValue}
          obj={values.image}
          style=""
        />
      ) : (
        <UploadFile
          name="image"
          value={values.name}
          error={errors.image}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
        />
      )}
      <GlobalInput
        type="text"
        value={values.name}
        error={errors.name}
        handleChange={handleChange}
        label="NAME"
      />
      <GlobalInput
        type="text"
        value={values.description}
        error={errors.description}
        handleChange={handleChange}
        label="DESCRIPTION"
      />
      <GlobalInput
        type="number"
        value={values.price}
        error={errors.price}
        handleChange={handleChange}
        label="PRICE"
      />
      <div className="w-full ">
        <select
          name="collection"
          onChange={handleChange}
          id="collections"
          className="text-white text-sm bg-Black-2 rounded-lg p-3 w-full outline-none"
        >
          <option value="">Select Collection</option>
          {collections?.map((collection: any, idx: number) => {
            if (collection?.metadata.name === fromQuery) {
              return (
                <option selected key={idx} value={collection?.collectionToken}>
                  {collection?.metadata?.name}
                </option>
              );
            } else {
              return (
                <option key={idx} value={collection?.collectionToken}>
                  {collection?.metadata?.name}
                </option>
              );
            }
          })}
        </select>
      </div>
      {!isSubmitting ? (
        <FilledButton
          text={"CREATE NFT"}
          onClick={() => submitForm()}
          extra={`h-12 w-full ${
            !dirty || Object.entries(errors).length > 0
              ? "cursor-not-allowed !bg-gradient-to-r !from-pink-500 !to-pink-500"
              : ""
          }`}
        />
      ) : (
        <OutlinedButton
          text={() => (
            <span className="flex items-center gap-3">
              <LoadingEffect />
              <small className="text-white text-base">
                Creation on progress
              </small>
            </span>
          )}
          onClick={() => {}}
          extra={"h-12 w-full cursor-not-allowed "}
        />
      )}
    </div>
  );
};
