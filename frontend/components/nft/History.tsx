import { ethers } from "ethers";
import React from "react";

export const History = ({ transactions }: { transactions: Array<any> }) => {
  if (!transactions)
    return <div className="text-white ">no history yet !!</div>;
  return (
    <div className="relative h-full overflow-x-auto shadow-md ">
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs  uppercase bg-Dark text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Buyer
            </th>
            <th scope="col" className="px-6 py-3">
              Seller
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions?.length > 0 &&
            transactions?.map((transaction, idx) => (
              <tr
                key={idx}
                className="border-b bg-gray-800 border-gray-700  odd:bg-Black-4 even:bg-Black-3"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {transaction?.buyer.slice(0, 6)}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {transaction?.seller.slice(0, 6)}
                </th>
                <td className="px-6 py-4 text-center">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    {ethers.utils.formatEther(transaction?.price) || "unknown"}{" "}
                    ETH
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
