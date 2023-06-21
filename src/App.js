import "./App.css";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import User from "./components/User";
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
