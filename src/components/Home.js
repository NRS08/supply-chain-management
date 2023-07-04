import React from "react";
import { useEffect, useState } from "react";
import "./CSS/Home.css";
import {
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import SCM from "../artifacts/contracts/SupplyChain.sol/SupplyChain.json";

const Home = () => {
  let INDRupees = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });
  const navigate = useNavigate();
  const [id, setid] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/user");
    }
  }, []);

  const prices = [1000, 99999, 1000199];
  const locations = [
    "Arvi, Wardha, Maharashtra, 442200, India",
    "Mumbai",
    "Delhi",
  ];

  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/-4e5fsDjluNgzUNf9u0nNElwVvNV2QYq"
  );
  const wallet = new ethers.Wallet(
    "9950025c546ede2c2bb22c6dd3b984efe4f7622c4e22eb26f7facffad32e099b",
    provider
  );
  const contract = new ethers.Contract(
    "0x54e6b4cf490695FEcdBd5206D007Ba352E5C35B6",
    SCM.abi,
    wallet
  );

  function HandleInputChange(e) {
    setid(e.target.value);
  }

  async function fetch() {
    const table = document.querySelector(".itemInfo");
    table.style.display = "none";
    try {
      const product = await contract.getProductDetails(id);
      console.log(
        Number(product.productID),
        product.productName,
        Number(product.productQuantity),
        product.productPrice,
        product.productLocation,
        Number(product.productTimestamp),
        product.productOwner
      );
      table.style.display = "flex";
    } catch (error) {
      if (error.message.includes("Invalid product ID")) {
        alert("Product ID doesn't exist");
      }
    }
  }

  return (
    <>
      <Navbar />
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
        <div className="itemInfo">
          <TableContainer
            w={"auto"}
            border={"1px solid grey"}
            borderRadius={"1rem"}
            p={4}
          >
            <Table variant="simple">
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr>
                  <Th>Prices</Th>
                  <Th>Location</Th>
                </Tr>
              </Thead>
              <Tbody>
                {prices.map((price, index) => {
                  return (
                    <Tr>
                      <Td>{INDRupees.format(price)}</Td>
                      <Td>{locations[index]}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default Home;
