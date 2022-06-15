import { Web3Provider } from "@ethersproject/providers";
import { ethers, Signer, providers, Contract } from "ethers";
import { useCallback, useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { useSlice } from "./reduxHooks";

export const useWallet = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [signer, setSigner] = useState<Signer | null>(null);
  const [provider, setProvider] = useState<Web3Provider | null>(null);
  const [network, setNetwork] = useState<providers.Network | null>(null);
  const [contrat, setContract] = useState<Contract | null>(null);
  const [isMetaInsttaled, setIsMetaInstalled] = useState<boolean>(true);
  const [{ abi, address: contractAddress }, dispatch] = useSlice("contract");

  const setupContract = useCallback(async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const detectedSigner = provider.getSigner();

      setProvider(provider);
      setSigner(detectedSigner);
      setNetwork(await provider.getNetwork());
      setAddress(await detectedSigner.getAddress());

      const contract =
        contractAddress &&
        abi &&
        new ethers.Contract(contractAddress, abi, detectedSigner);
      setContract(contract);
    } catch (error) {
      setAddress(null);
      setSigner(null);
      setProvider(null);
      setNetwork(null);
      setContract(null);
    }
  }, [abi, contractAddress]);

  useEffect(() => {
    if (window.ethereum) {
      contractAddress && abi && setupContract();
      window.ethereum.on("accountsChanged", setupContract);
      window.ethereum.on("netw", setupContract);
    } else {
      setIsMetaInstalled(false);
    }
  }, [abi, contractAddress]);

  return {
    address,
    signer,
    network,
    contrat,
    provider,
    setupContract,
    isMetaInsttaled,
    avatar,
  };
};
