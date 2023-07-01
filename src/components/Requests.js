import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
  Input,
} from "@chakra-ui/react";
import Navbar2 from "./Navbar2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { jsPDF } from "jspdf";
import { sha256 } from "js-sha256";
import { useGlobalContext } from "../context";
import Loader from "./Loader";

export default function Requests() {
  const url =
    "https://tiny-jade-marlin-belt.cyclic.app/api/v1/buying/requests?accepted=";
  const urlWallet =
    "https://tiny-jade-marlin-belt.cyclic.app/api/v1/buying/wallet";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState([false]);
  const [heading, setHeading] = useState("Pending Requests");
  const [location, setLocation] = useState(null);
  const [Doc, setDoc] = useState(null);
  const [wallet, setWallet] = useState("");
  const { account, setAccount, contract, setContract, provider, setProvider } =
    useGlobalContext();

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Get the current position
      navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var locationString = latitude + "," + longitude;
        setLocation(locationString);
        // Do something with the latitude and longitude values
        console.log("Latitude: " + latitude);
        console.log("Longitude: " + longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  async function generateHash(x) {
    const hash = sha256(x);
    return hash;
  }
  async function genPdf() {
    const doc = new jsPDF();

    // Set font size and styling
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");

    // Add information
    doc.text("ID:", 20, 10);
    doc.text("Name:", 20, 20);
    doc.text("Product Name:", 20, 30);
    doc.text("Quantity:", 20, 40);
    doc.text("Price:", 20, 50);
    doc.text("Location:", 20, 60);
    doc.text("Time:", 20, 70);
    doc.text("Buyer:", 20, 80);

    // Set font style for the values
    doc.setFont("helvetica", "normal");

    // Add values
    doc.text("1000", 80, 10);
    doc.text("AA", 80, 20);
    doc.text("A", 80, 30);
    doc.text("100", 80, 40);
    doc.text("100000", 80, 50);
    doc.text("a", 80, 60);
    doc.text("10:00 AM", 80, 70);
    doc.text("Jane Smith", 80, 80);

    const generatedPdfContent = doc.output("arraybuffer");
    const hash = await generateHash(generatedPdfContent);

    console.log(hash);
    sellProduct(hash, doc);
  }

  async function sellProduct(hash, doc) {
    console.log("hi");
    const tx = await contract.sellProduct(
      1000,
      "0x8b112fBa060afeA9eb8fEc329feb1d2A468a46A5",
      100000,
      location,
      hash
    );
    await tx.wait();
    doc.save("1_scm_nirant.pdf");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      let u = url + "false";
      getData(u);
    }
  }, []);

  const token = localStorage.getItem("token");

  const getWallet = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(urlWallet, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      setWallet(data.account);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  const getData = async (url) => {
    try {
      setIsLoading(true);
      getWallet();
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(data.requests);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const buyer = (id) => {
    console.log(wallet, id);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar2 />
      <Box
        height={"6vh"}
        p={4}
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={6}
        marginTop={"1rem"}
      >
        <Button
          variant={"link"}
          colorScheme={"purple"}
          onClick={() => {
            setHeading("Pending Requests");
            getData(url + "false");
          }}
        >
          Pending
        </Button>
        <Button
          variant={"link"}
          colorScheme={"purple"}
          onClick={() => {
            setHeading("Acepted Requests");
            getData(url + "true");
          }}
        >
          Accepted
        </Button>
      </Box>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        marginTop={4}
      >
        <Heading fontSize={"xl"}>{heading}</Heading>
      </Box>
      {data.length === 0 ? (
        <Heading color={"white"} size={"xl"} p={6}>
          No Requests Available
        </Heading>
      ) : (
        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={{
            base: "center",
            sm: "center",
            md: "space-around",
            lg: "center",
          }}
          alignItems={"center"}
          gap={4}
          p={{ base: 2, md: 6, lg: 6 }}
          flexWrap={"wrap"}
          textTransform={"capitalize"}
        >
          {data.map((item) => {
            return (
              <Box
                key={item._id}
                py={2}
                flex={{
                  base: "0 0 60%",
                  sm: "0 0 50%",
                  md: "0 0 33.33%",
                  lg: "0 0 20%",
                }}
              >
                <Box
                  maxW={"320px"}
                  w={"full"}
                  bg={"gray.900"}
                  boxShadow={"2xl"}
                  rounded={"lg"}
                  p={6}
                  textAlign={"center"}
                >
                  <Heading fontSize={"2xl"} fontFamily={"body"}>
                    {`Item - ${item.Iname}`}
                  </Heading>
                  <Text fontWeight={600} color={"gray.500"}>
                    {`${item.amount} Kg`}
                  </Text>
                  <Text fontWeight={600} color={"gray.500"} mb={2}>
                    {`${item.price} Rupees`}
                  </Text>
                  <Heading fontSize={"xl"} fontFamily={"body"}>
                    {`Buyer - ${item.buyerName}`}
                  </Heading>

                  <Stack mt={8} direction={"row"} spacing={4}>
                    <Button
                      flex={1}
                      variant={"outline"}
                      colorScheme="green"
                      fontSize={"sm"}
                      rounded={"full"}
                      onClick={() => buyer(item.buyerAccount)}
                    >
                      {`Accept`}
                    </Button>
                    <Button
                      flex={1}
                      variant={"outline"}
                      colorScheme="red"
                      fontSize={"sm"}
                      rounded={"full"}
                    >
                      {`Reject`}
                    </Button>
                  </Stack>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </>
  );
}
