import Image from "next/image";
import React from "react";

export const ImagePreviewer = ({
  obj,
  style,
  setFieldValue,
  handleChange,
  name,
}: {
  obj: File;
  style: string;
  handleChange?: () => void;
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  name: string;
}) => {
  console.log(obj);

  return (
    <div
      onClick={() =>
        setFieldValue
          ? setFieldValue(name, null)
          : handleChange && handleChange()
      }
      className="
          relative 
          flex flex-col 
          justify-center 
          py-3 gap-6 
          items-center w-full 
          h-64 bg-Black-3 rounded-lg 
          border-2 border-grayLight 
          border-opacity-70 border-dashed 
          cursor-pointer
          overflow-hidden
          "
    >
      <span className="absolute flex opacity-0 hover:opacity-80  w-full h-full bg-grayDarker z-30  justify-center items-center">
        <svg
          width="48px"
          height="48px"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 48 48"
        >
          <path
            fill="#8CBCD6"
            d="M40,41H8c-2.2,0-4-1.8-4-4V11c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v26C44,39.2,42.2,41,40,41z"
          />
          <circle fill="black" cx={35} cy={16} r={3} />
          <polygon fill="black" points="20,16 9,32 31,32" />
          <polygon fill="black" points="31,22 23,32 39,32" />
          <circle fill="#F4ABA6" cx={38} cy={38} r={10} />
          <g fill="#fff">
            <rect
              x="36.5"
              y={32}
              transform="matrix(-.707 .707 -.707 -.707 91.74 38)"
              width={3}
              height={12}
            />
            <rect
              x="36.5"
              y={32}
              transform="matrix(-.707 -.707 .707 -.707 38 91.74)"
              width={3}
              height={12}
            />
          </g>
        </svg>
      </span>
      <Image
        className={style}
        objectFit="contain"
        width={600}
        height={600}
        src={(() => {
          var url = URL.createObjectURL(obj);
          return url;
        })()}
      />
    </div>
  );
};
