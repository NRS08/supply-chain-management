import React from "react";
import "./CSS/Navbar.css";
import { Button } from "@chakra-ui/react";
import WalletIcon from "@mui/icons-material/Wallet";
import { ethers } from "ethers";
import SCM from "../artifacts/contracts/SupplyChain.sol/SupplyChain.json";
import { useGlobalContext } from "../context";

const Navbar = () => {
  const { account, setAccount, contract, setContract, provider, setProvider } =
    useGlobalContext();
  const isAndroid = /android/i.test(navigator.userAgent);
  // console.log(isAndroid);
  async function ButtonClick() {
    console.log("window.ethereum:", window.ethereum);
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("provider:", provider);
      const loadProvider = async () => {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x3B117Ff72803eadECDc3944e414B5fb0931d872C";
        const contract = new ethers.Contract(contractAddress, SCM.abi, signer);

        setContract(contract);
        setProvider(provider);
        console.log(typeof contract);
      };
      provider && loadProvider();
    } else {
      if (!isAndroid) alert("Install Metamask");
    }
  }
  return (
    <div className="Nav-body">
      <div className="logo">Supply Chain Management</div>
      <div className="connect">
        <Button
          onClick={ButtonClick}
          rightIcon={<WalletIcon />}
          colorScheme="green"
          variant="solid"
        >
          {isAndroid === false ? (
            account === null ? (
              "Connect"
            ) : (
              account
            )
          ) : (
            <a href="https://metamask.app.link/dapp/supply-chain-management-hwgf58pvq-nrs08.vercel.app/">
              Connect
            </a>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
