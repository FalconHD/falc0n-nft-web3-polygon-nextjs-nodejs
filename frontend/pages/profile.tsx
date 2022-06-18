import { NextWithLayoutPage } from "@/interfaces";
import { setUser } from "@/slices";
import { UploadFile } from "components/Form_items";
import { GlobalInput, ImagePreviewer } from "components/global";
import { useSlice } from "hooks/reduxHooks";
import { useFetch } from "hooks/useFetch";
import { useWallet } from "hooks/useWallet";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Profile: NextWithLayoutPage = () => {
  const [edit, setedit] = useState(false);
  const [{ user }, dispatch] = useSlice("contract");
  const [userInfo, setUserInfo] = useState<{
    name: string;
    image: any;
  }>({
    name: user?.name || "",
    image: null,
  });
  const { address } = useWallet();
  const [fetcher, { data, loading, error, isError }] = useFetch();

  const updateUser = async () => {
    const fd = new FormData();
    fd.append("name", userInfo.name);
    fd.append("image", userInfo.image);

    let result = await fetcher({
      method: "POST",
      url: "/user/" + address,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: fd,
    });
    dispatch(setUser(result?.user));
    setUserInfo({
      name: userInfo.name,
      image: userInfo.image,
    });
    setedit(false);
  };

  useEffect(() => {
    if (address) {
      (async () => {
        await fetcher({
          method: "GET",
          url: "/user/" + address,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })();
    }
  }, [address]);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <div className="bg-Black-2 shadow overflow-hidden sm:rounded-lg">
      <div className="w-full flex justify-between items-center">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-grayLight">
            User Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-grayLight">
            This information linked to our marketplace
          </p>
        </div>
        <div className="px-4 py-5 sm:px-6">
          {!edit ? (
            <svg
              onClick={() => setedit(true)}
              className="w-6 h-6 text-white hover:text-primary  cursor-pointer"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <div className="flex gap-3">
              <svg
                onClick={updateUser}
                className="w-6 h-6 text-white hover:text-primary  cursor-pointer"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                onClick={() => setedit(false)}
                className="w-6 h-6 text-white hover:text-primary  cursor-pointer"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {!edit ? (
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-Dark px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-grayLight">
                Wallet Address
              </dt>
              <dd className="mt-1 text-sm text-grayLight sm:mt-0 sm:col-span-2">
                {address || "No wallet address"}
              </dd>
            </div>
            <div className="bg-Black-2 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-grayLight">Full name</dt>
              <dd className="mt-1 text-sm text-grayLight sm:mt-0 sm:col-span-2">
                {user?.name || "Unamed"}
              </dd>
            </div>
            <div className="bg-Dark px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-grayLight">Avatar</dt>
              <dd className="mt-1 text-sm text-grayLight sm:mt-0 sm:col-span-2">
                <img
                  className="w-20 h-20 p-1 rounded-full ring-2 ring-primary cursor-pointer "
                  src={
                    user?.avatar
                      ? "https://ipfs.infura.io/ipfs/" + user?.avatar
                      : "https://picsum.photos/200/300"
                  }
                  alt="Bordered avatar"
                />
              </dd>
            </div>
          </dl>
        </div>
      ) : (
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-Dark px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-grayLight">
                Wallet Address
              </dt>
              <dd className="mt-1 text-sm text-grayLight sm:mt-0 sm:col-span-2">
                <GlobalInput
                  disabled={true}
                  value={address || ""}
                  handleChange={(e) => {
                    console.log(e.target.value);
                  }}
                  label=""
                  type="text"
                />
              </dd>
            </div>
            <div className="bg-Black-2 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-grayLight">Full name</dt>
              <dd className="mt-1 text-sm text-grayLight sm:mt-0 sm:col-span-2">
                <GlobalInput
                  value={user?.name}
                  handleChange={(e) => {
                    setUserInfo({ ...userInfo, name: e.target.value });
                  }}
                  label=""
                  type="text"
                />
              </dd>
            </div>
            <div className="bg-Dark px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-grayLight">Avatar</dt>
              <dd className="mt-1 text-sm text-grayLight sm:mt-0 sm:col-span-2">
                {!userInfo.image ? (
                  <UploadFile
                    name="image"
                    handleChange={(e) => {
                      console.log(e.target);

                      if (e.target.files)
                        setUserInfo({ ...userInfo, image: e.target.files[0] });
                    }}
                  />
                ) : (
                  <ImagePreviewer
                    name="image"
                    obj={userInfo.image}
                    style=""
                    handleChange={() =>
                      setUserInfo({
                        ...userInfo,
                        image: null,
                      })
                    }
                  />
                )}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
};

export default Profile;
