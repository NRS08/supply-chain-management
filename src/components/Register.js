import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useColorMode,
  Link,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const url = "https://tiny-jade-marlin-belt.cyclic.app/api/v1/auth/register";
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("error");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  if (colorMode == "light") toggleColorMode();
  const navigate = useNavigate();
  const signIn = () => {
    navigate("/login");
  };

  const register = async () => {
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#Email").value;
    let password = document.querySelector("#Password").value;
    let role = document.querySelector("#role").value;
    try {
      setIsLoading(true);
      const res = await axios.post(url, { name, role, email, password });
      // setPassword("");
      setStatus("success");
      setMessage("User Created");
      const alert = document.querySelector(".alert");
      alert.style.display = "flex";
      setTimeout(() => {
        const alert = document.querySelector(".alert");
        alert.style.display = "none";
        setIsLoading(false);
        navigate("/login");
      }, 3000);
    } catch (error) {
      setStatus("error");
      setMessage(error.response.data.msg);
      // setPassword("");
      const alert = document.querySelector(".alert");
      alert.style.display = "flex";
      document.querySelector("#name").value = "";
      document.querySelector("#Email").value = "";
      document.querySelector("#Password").value = "";
      document.querySelector("#role").value = "";
      setIsLoading(false);
      setTimeout(() => {
        const alert = document.querySelector(".alert");
        alert.style.display = "none";
      }, 3000);
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "#0d1117")}
    >
      <Alert
        className="alert"
        variant={"solid"}
        status={status}
        position={"absolute"}
        w={"auto"}
        top="20px"
        display={"none"}
        justifyContent="center"
      >
        <AlertIcon />
        {message}
      </Alert>
      <Stack spacing={6} mx={"auto"} maxW={"lg"} py={10} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          {/* <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features 
          </Text> */}
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input id="name" placeholder="Name" type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Role</FormLabel>
                  <Input id="role" placeholder="Eg. Farmer" type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input id="Email" placeholder="username@email.com" type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  id="Password"
                  placeholder="******"
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              {isLoading ? (
                <Button
                  isLoading
                  loadingText="Loading"
                  colorScheme="teal"
                  variant="outline"
                  spinnerPlacement="start"
                >
                  Submit
                </Button>
              ) : (
                <Button onClick={register} variant="outline" colorScheme="teal">
                  Sign in
                </Button>
              )}
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link onClick={signIn} color={"blue.400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
