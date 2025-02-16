import React from 'react';
import { FaWallet } from 'react-icons/fa';

const Header = ({ connected, account, balance, connectWallet }) => {
  return (
    <header className="p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">NFT Collection</h1>
      <div className="flex items-center gap-4">
        {connected && (
          <div className="text-sm">
            <p>Balance: {balance} ETH</p>
          </div>
        )}
        <button
          onClick={connectWallet}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-all"
        >
          <FaWallet />
          {connected ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
        </button>
      </div>
    </header>
  );
};

export default Header;
