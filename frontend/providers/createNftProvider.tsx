import React, { useEffect } from "react";
import { ReactNode } from "react";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import { createCollection } from "blockchain/collection";
import { ICollectionInput } from "@/interfaces";
import { useBlockchain } from "hooks/useBlockchain";
import { createNFT } from "blockchain/nfts";
import { useRouter } from "next/router";

const SUPPORTED_TYPES: string[] = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "video/mp4",
  "video/webm",
];

export type addNFTValues = {
  name: string;
  description: string;
  price: number;
  collection: string;
  image: File | null;
};

const validationSchema = () =>
  Yup.object({
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    price: Yup.number().required("Required"),
    collection: Yup.string().required("Required"),
    image: Yup.mixed()
      .test("Required", "item is required", (value) => value !== null)
      .test(
        "fileSize",
        "File Size is too large",
        (value) => value?.size <= 20000000
      )
      .test("fileType", "Unsupported File Format", (value) =>
        SUPPORTED_TYPES.includes(value?.type)
      ),
  });

export const CreateNftProvider = ({ children }: { children: ReactNode }) => {
  const { data, error, isError, loading, runner } = useBlockchain(createNFT);

  const { push } = useRouter();

  useEffect(() => {
    if (data) push(`/nft/${data.tokenId.toString()}`);
  }, [data]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: null,
      collection: "",
      price: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      if (values.image) formData.append("image", values.image);

      await runner({
        formData,
        price: values.price,
        collection: values.collection,
      });
    },
    validateOnChange: true,
    validateOnBlur: false,
    validateOnMount: false,
  });
  return <FormikProvider value={formik}>{children}</FormikProvider>;
};
