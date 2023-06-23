import "./App.css";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import User from "./components/User";
import ListItem from "./components/ListItem";
import Items from "./components/Items";
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
          <Route path="/listItem" element={<ListItem />} />
          <Route path="/items" element={<Items />} />
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
