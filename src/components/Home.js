import React from 'react';
import './CSS/Home.css';
import { Button, Input } from '@chakra-ui/react';
import SearchIcon from '@mui/icons-material/Search';

const Home = () => {
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
          <Button colorScheme="teal" variant="solid">
            <SearchIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
