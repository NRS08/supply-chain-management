import React from 'react';
import './CSS/Navbar.css';
import { Button } from '@chakra-ui/react';
import WalletIcon from '@mui/icons-material/Wallet';
import { useGlobalContext } from '../context';

const Navbar = () => {
  const { account, setAccount, contract, setContract, provider, setProvider } =
    useGlobalContext();

  return (
    <div className="Nav-body">
      <div className="logo">Supply Chain Management</div>
      <div className="connect">
        <Button rightIcon={<WalletIcon />} colorScheme="green">
          Connect
        </Button>
        {/* rightIcon={<WalletIcon />} */}
      </div>
    </div>
  );
};

export default Navbar;
