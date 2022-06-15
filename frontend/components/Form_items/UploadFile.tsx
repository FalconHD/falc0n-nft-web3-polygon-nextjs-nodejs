import React, { ChangeEventHandler } from "react";

export const UploadFile = ({
  value,
  error,
  setFieldValue,
  name,
}: {
  value: string;
  error: string | undefined;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}) => {
  return (
    <>
      <div className="flex justify-center items-center w-full ">
        <label
          htmlFor={`dropzone-file-${name}`}
          className="flex flex-col justify-center py-3 gap-6 items-center w-full h-64 bg-Black-3 rounded-lg border-2 border-grayLight border-opacity-70 border-dashed cursor-pointer "
        >
          <h1 className="text-white font-semibold lg:text-lg md:text-lg sm:text-xs text-xs">
            JPG,PNG,GIF,SVG,WEBM,MP3,MP4,Max 100mb.
          </h1>
          <svg
            width={115}
            height={115}
            viewBox="0 0 115 115"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M32.761 114.583H82.233C101.586 114.583 114.583 101.008 114.583 80.8087V34.1913C114.583 13.9917 101.586 0.416668 82.2387 0.416668H32.761C13.4138 0.416668 0.416504 13.9917 0.416504 34.1913V80.8087C0.416504 101.008 13.4138 114.583 32.761 114.583ZM37.5142 51.7917C29.6444 51.7917 23.2498 45.3885 23.2498 37.5208C23.2498 29.6532 29.6444 23.25 37.5142 23.25C45.3782 23.25 51.7785 29.6532 51.7785 37.5208C51.7785 45.3885 45.3782 51.7917 37.5142 51.7917ZM102.144 74.248C104.055 79.1493 103.062 85.0402 101.019 89.8943C98.5962 95.6675 93.9582 100.039 88.1147 101.947C85.5201 102.796 82.7993 103.167 80.0842 103.167H31.9758C27.1886 103.167 22.9523 102.018 19.4795 99.8795C17.304 98.5364 16.9194 95.4377 18.5324 93.4289C21.2303 90.0711 23.8937 86.7015 26.5801 83.3024C31.7003 76.7988 35.1502 74.9137 38.9846 76.569C40.5402 77.2524 42.1015 78.2774 43.7088 79.3613C47.9909 82.2715 53.9435 86.2714 61.7845 81.9298C67.1504 78.9245 70.2625 73.7695 72.9727 69.2804L73.0181 69.2053C73.2101 68.8904 73.4004 68.5755 73.5902 68.2615C74.501 66.7544 75.3997 65.2675 76.4162 63.8976C77.6905 62.1833 82.4147 56.8225 88.5337 60.6399C92.4313 63.0434 95.7089 66.2952 99.2162 69.7767C100.554 71.1081 101.506 72.6221 102.144 74.248Z"
              fill="white"
            />
          </svg>
          <span className="flex flex-col text-white justify-between items-center lg:text-lg md:text-lg sm:text-xs text-xs">
            <h3>Grap and Drop your file here</h3>
            <h3>or click to upload</h3>
          </span>
          <input
            id={`dropzone-file-${name}`}
            name={name}
            onChange={(event) => {
              if (event.currentTarget.files)
                setFieldValue(name, event.currentTarget.files[0]);
            }}
            type="file"
            className="hidden"
          />
        </label>
      </div>
    </>
  );
};
