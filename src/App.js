import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Navbar />
        <Home />
      </div>
    </ChakraProvider>
  );
}

export default App;
