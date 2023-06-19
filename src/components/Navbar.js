import React from 'react';
import './CSS/Navbar.css';
import { Button } from '@chakra-ui/react';
import WalletIcon from '@mui/icons-material/Wallet';

const Navbar = () => {
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
