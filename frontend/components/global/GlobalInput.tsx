import { ICollection } from "@/interfaces";
import React, { ChangeEventHandler } from "react";

export const GlobalInput = ({
  error,
  handleChange,
  label,
  value,
  type,
}: {
  error: string | undefined;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
  value: string | number;
  type: "text" | "number";
}) => {
  return (
    <div className="mb-6 w-full">
      {error ? (
        <>
          <label
            htmlFor="error"
            className="block mb-2 text-sm font-medium text-red-500"
          >
            {label}
          </label>
          <input
            name={label.toLocaleLowerCase()}
            onChange={handleChange}
            value={value}
            type={type}
            id="error"
            className=" border text-sm rounded-lg focus:ring-red-500 bg-gray-700 focus:border-red-500 block w-full p-2.5 text-red-500 placeholder-red-500 border-red-500"
            placeholder="required *"
          />
          {value && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Oh, snapp!</span> Some error
              message.
            </p>
          )}
        </>
      ) : (
        <>
          <label
            htmlFor="success"
            className="block mb-2 text-sm font-medium text-white"
          >
            {label}
          </label>
          <input
            name={label.toLocaleLowerCase()}
            onChange={handleChange}
            value={value}
            type="text"
            id="success"
            className=" text-white  placeholder-white text-sm rounded-lg  focus:border-grayDarker block w-full p-2.5 bg-gray-700 "
          />
        </>
      )}
    </div>
  );
};
