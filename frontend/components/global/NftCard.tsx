import { setUser } from "@/slices";
import { ethers } from "ethers";
import { useSlice } from "hooks/reduxHooks";
import { useFetch } from "hooks/useFetch";
import { useWallet } from "hooks/useWallet";
import Image from "next/image";
import React, {
  useEffect,
  useState,
  forwardRef,
  LegacyRef,
  Ref,
  MouseEventHandler,
  DetailedHTMLProps,
  HTMLAttributes,
} from "react";

export const NftCard = forwardRef(
  (
    {
      href,
      onClick,
      nft,
    }: {
      href?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      onClick?: MouseEventHandler<HTMLDivElement>;
      nft: any;
    },
    ref: LegacyRef<HTMLDivElement> | undefined
  ) => {
    const [fetcher, { data, error, isError, loading }] = useFetch();
    const { address } = useWallet();
    const [{ user }, dispatch] = useSlice("contract");
    const [likes, setLikes] = useState(0);
    const [loveIt, setLoveIt] = useState(false);
    

    useEffect(() => {
      if (nft) {
        setLoveIt(
          user?.likes?.includes(
            ethers.utils.formatUnits("" + nft?.nftToken, 18)
          )
        );
        setLikes(nft?.likes?.length);
      }
    }, [nft]);

    const setLikesToggle = async (loveIt: boolean) => {
      const result = await fetcher({
        url: `/nft/like/${ethers.utils.formatUnits("" + nft?.nftToken, 18)}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          liker: address,
        }),
      });
      setLoveIt(loveIt);
      setLikes(loveIt ? likes + 1 : likes - 1);
      result && dispatch(setUser(result?.user));
    };

    useEffect(() => {
      console.log(
        user?.likes?.includes(ethers.utils.formatUnits("" + nft?.nftToken, 18)),
        nft,
        loveIt
      );
    }, [nft]);

    return (
      <div
        //@ts-ignore
        href={href}
        onClick={onClick}
        ref={ref || null}
        className="max-w-sm max-h-fit min-h-[500px] md:min-h-fit lg:min-h-fit sm:min-h-fit   flex flex-col justify-between rounded-3xl bg-Black-3 "
      >
        <Image
          className="rounded-3xl h-full object-contain p-2"
          src={
            "https://ipfs.infura.io/ipfs/" + nft?.metadata?.image ||
            "https://img.seadn.io/files/5e985ecc4fb9d882093f98eec7c18029.jpg?auto=format&h=720&w=720"
          }
          layout="responsive"
          width={70}
          height={80}
          objectFit="contain"
          alt=""
        />

        <div className="p-3">
          <h5 className="mb-2 text-sm  font-semibold tracking-tigh text-white">
            {nft?.metadata?.name ?? "Noteworthy technology acquisitions 2021"}
          </h5>
          <div className="flex justify-between items-center">
            <span className="text-sm text-white">
              <strong>{nft?.price}</strong> ETH
            </span>
            <span
              onClick={async (e) => {
                e.stopPropagation();
                await setLikesToggle(!loveIt);
              }}
            >
              {!loveIt ? (
                <section className="flex gap-1 justify-center items-center text-white cursor-pointer">
                  <svg
                    className="w-5 h-5 text-grayDark"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="{2}"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <small className="text-md font-semibold">{likes}</small>
                </section>
              ) : (
                <section className="flex gap-1 justify-center items-center text-white cursor-pointer">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <small className="text-md font-semibold">{likes}</small>
                </section>
              )}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

NftCard.displayName = "NftCard";
