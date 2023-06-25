import React from "react";
import { useEffect, useState } from "react";
import "./CSS/Home.css";
import { useGlobalContext } from "../context";
import Navbar2 from "./Navbar2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Heading,
  Button,
  Stack,
  Input,
  Alert,
  AlertIcon,
  useColorMode,
} from "@chakra-ui/react";

const BuyRequest = () => {
  const url = "https://tiny-jade-marlin-belt.cyclic.app/api/v1/buying/request";
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Message");
  const [status, setStatus] = useState("error");
  const { colorMode } = useColorMode();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  const token = localStorage.getItem("token");

  const addItem = async () => {
    try {
      setIsLoading(true);
      const Iname = document.querySelector(".Iname").value;
      const amount = parseInt(document.querySelector(".quantity").value);
      const price = parseInt(document.querySelector(".price").value);
      const buyerName = localStorage.getItem("scmName");
      const seller = document.querySelector(".seller").value;

      const { data } = await axios.post(
        url,
        {
          Iname,
          amount,
          price,
          buyerName,
          seller,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStatus("success");
      setMessage("Item Added");
      const alert = document.querySelector(".alert");
      alert.style.display = "flex";
      setIsLoading(false);
      document.querySelector(".quantity").value = "";
      document.querySelector(".Iname").value = "";
      document.querySelector(".price").value = "";
      document.querySelector(".seller").value = "";
      setTimeout(() => {
        const alert = document.querySelector(".alert");
        alert.style.display = "none";
      }, 500);
    } catch (error) {
      console.log(error);
      setStatus("error");
      setMessage(error.response.data.msg);
      setIsLoading(false);
      const alert = document.querySelector(".alert");
      alert.style.display = "flex";
      //   document.querySelector(".name").value = "";
      setTimeout(() => {
        const alert = document.querySelector(".alert");
        alert.style.display = "none";
      }, 3000);
    }
  };

  return (
    <>
      <Navbar2 />
      <Box
        // position={"relative"}
        minH="90vh"
        bg={"#0d1117"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"flex-start"}
      >
        <Box
          className="alert"
          w={"100vw"}
          display={"none"}
          justifyContent="center"
          position="fixed"
          top={"10px"}
          zIndex="100"
        >
          <Alert
            status={status}
            position={"absolute"}
            w={"auto"}
            variant="solid"
          >
            <AlertIcon />
            {message}
          </Alert>
        </Box>
        <Box
          marginTop={6}
          marginBottom={6}
          width={{ base: "90%", md: "70%", lg: "60%" }}
          border="solid 1px"
          p={2}
          borderRadius={"1rem"}
          backgroundColor={"#0d1117"}
          height={"auto"}
        >
          <Text textAlign={"center"} fontSize={"2xl"} fontWeight="bold">
            Buy Request
          </Text>
          <Stack mt={2} direction={"column"} gap={1}>
            <Box display={"flex"} gap={2} alignItems="center">
              <Text
                w={{ base: "40%", md: "30%", lg: "20%" }}
                fontSize={"lg"}
                fontWeight={"600"}
              >
                Item Name
              </Text>
              <Input className="Iname" placeholder="Name" />
            </Box>
            <Box display={"flex"} gap={2} alignItems="center">
              <Text
                w={{ base: "40%", md: "30%", lg: "20%" }}
                fontSize={"lg"}
                fontWeight={"600"}
              >
                Quantity
              </Text>
              <Input type={"number"} className="quantity" placeholder="1000" />
            </Box>
            <Box display={"flex"} gap={2} alignItems="center">
              <Text
                w={{ base: "40%", md: "30%", lg: "20%" }}
                fontSize={"lg"}
                fontWeight={"600"}
              >
                Price
              </Text>
              <Input type={"number"} className="price" placeholder="100000" />
            </Box>
            <Box display={"flex"} gap={2} alignItems="center">
              <Text
                w={{ base: "40%", md: "30%", lg: "20%" }}
                fontSize={"lg"}
                fontWeight={"600"}
              >
                Seller Id
              </Text>
              <Input className="seller" placeholder="Seller ID" />
            </Box>
          </Stack>
          <Box w={"100%"} display="flex" justifyContent={"center"}>
            {isLoading ? (
              <Button
                isLoading
                loadingText="Loading"
                colorScheme="teal"
                variant="outline"
                spinnerPlacement="start"
                mt={4}
                mb={4}
              >
                Submit
              </Button>
            ) : (
              <Button
                mt={4}
                mb={4}
                w={{ base: "100%", md: "50%" }}
                colorScheme="teal"
                onClick={addItem}
              >
                Send Request
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BuyRequest;
