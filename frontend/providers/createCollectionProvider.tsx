import React, { useEffect } from "react";
import { ReactNode } from "react";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import { createCollection } from "blockchain/collection";
import { ICollectionInput } from "@/interfaces";
import { useBlockchain } from "hooks/useBlockchain";
import { useRouter } from "next/router";
import { ethers } from "ethers";

const SUPPORTED_TYPES: string[] = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "video/mp4",
  "video/webm",
];

export type addCollectionValues = {
  name: string;
  description: string;
  profile: File | null;
  cover: File | null;
};

const validationSchema = () =>
  Yup.object({
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    profile: Yup.mixed()
      .test("Required", "profile image is required", (value) => value !== null)
      .test(
        "fileSize",
        "File Size is too large",
        (value) => value?.size <= 2000000
      )
      .test("fileType", "Unsupported File Format", (value) =>
        SUPPORTED_TYPES.includes(value?.type)
      ),
    cover: Yup.mixed()
      .test("Required", "cover image is required", (value) => value !== null)
      .test(
        "fileSize",
        "File Size is too large",
        (value) => value?.size <= 2000000
      )
      .test("fileType", "Unsupported File Format", (value) =>
        SUPPORTED_TYPES.includes(value?.type)
      ),
  });

export const CreateCollectionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { data, error, isError, loading, runner } =
    useBlockchain(createCollection);

  const { push } = useRouter();

  useEffect(() => {
    if (data) push(`/collection/${data.collectionToken.toString()}`);
  }, [data]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      profile: null,
      cover: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);

      if (values.profile) {
        formData.append("profile", values.profile);
      }
      if (values.cover) {
        formData.append("cover", values.cover);
      }

      await runner(formData);
    },
    validateOnChange: true,
    validateOnBlur: false,
    validateOnMount: false,
  });
  return <FormikProvider value={formik}>{children}</FormikProvider>;
};
