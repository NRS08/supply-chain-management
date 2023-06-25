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

export default function Requests() {
  const url =
    "https://tiny-jade-marlin-belt.cyclic.app/api/v1/buying/requests?accepted=";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState([false]);
  const [heading, setHeading] = useState("Pending Requests");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      let u = url + "false";
      console.log(u);
      getData(u);
    }
  }, []);
  const token = localStorage.getItem("token");
  const getData = async (url) => {
    try {
      setIsLoading(true);
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

  if (isLoading) {
    return (
      <Stack h={"100vh"} w="100%" justify="center" align="center">
        <Text fontSize={"4xl"}>Loading...</Text>
      </Stack>
    );
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
          onClick={() => getData(url + "false")}
        >
          Pending
        </Button>
        <Button
          variant={"link"}
          colorScheme={"purple"}
          onClick={() => getData(url + "true")}
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
