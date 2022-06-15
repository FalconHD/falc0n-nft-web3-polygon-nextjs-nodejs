import React from "react";

export const MetaMaskNotInstalled = () => {
  return (
    <>
      <h1>you need metamask to navigate throw the marketplace </h1>
      <h3>you Can install it from here : </h3>
      <small>
        {" "}
        <a href="https://metamask.io/download/">MetaMask</a>
      </small>
    </>
  );
};
