import React from "react";
import "./CSS/Home.css";
import { Button, Input } from "@chakra-ui/react";
import SearchIcon from "@mui/icons-material/Search";
import { useGlobalContext } from "../context";

const Home = () => {
  const { account, setAccount, contract, setContract, provider, setProvider } =
    useGlobalContext();
  async function fetch() {
    const tx = await contract.assignProduct("Wheat", 1000);
    await tx.wait();
    console.log(account);
    console.log(contract);
    const tx2 = await contract.sellProduct(
      1000,
      "0xa777122Ad242e2800781e8692a0591b964396aF4",
      1000000,
      "21.0010° N, 78.2307° E"
    );
    await tx2.wait();
    const data = await contract.getProductDetails(1000);
    console.log(data);
  }
  return (
    <div className="Home-body">
      <div className="content">
        <h1>Welcome to Supply Chain DAPP</h1>
        <p>
          This is a Decentralized Application that stores the history of goods
          from the producers to manufacturer, with all the information about the
          price history,locations and time stamps.
        </p>
        <p className="enter">Enter the product Id to check its information</p>
        <div className="search">
          <Input placeholder="Enter Product ID" />
          <Button onClick={fetch} colorScheme="teal" variant="solid">
            <SearchIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
