import React, { useState } from "react";
import { useEffect } from "react";
import "./CSS/Home.css";
import { Button, Input } from "@chakra-ui/react";
import SearchIcon from "@mui/icons-material/Search";
import { useGlobalContext } from "../context";
import Navbar2 from "./Navbar2";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import SCM from "../artifacts/contracts/SupplyChain.sol/SupplyChain.json";

const User = () => {
  const navigate = useNavigate();
  const [id, setid] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/-4e5fsDjluNgzUNf9u0nNElwVvNV2QYq"
  );
  const wallet = new ethers.Wallet(
    "9950025c546ede2c2bb22c6dd3b984efe4f7622c4e22eb26f7facffad32e099b",
    provider
  );
  const contract = new ethers.Contract(
    "0xD355E559ee9374Aa3906706F336012F398F88469",
    SCM.abi,
    wallet
  );

  function HandleInputChange(e) {
    setid(e.target.value);
  }

  async function fetch() {
    const data = await contract.getProductDetails(id);
    console.log(data);
  }
  return (
    <>
      <Navbar2 />
      <div className="Home-body">
        <div className="content">
          <h1>Welcome to Supply Chain DAPP</h1>
          <p>
            This is a Decentralized Application that stores the history of goods
            from the producers to manufacturer, with all the information about
            the price history,locations and time stamps.
          </p>
          <p className="enter">Enter the product Id to check its information</p>
          <div className="search">
            <Input
              placeholder="Enter Product ID"
              onChange={HandleInputChange}
            />
            <Button onClick={fetch} colorScheme="teal" variant="solid">
              <SearchIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
