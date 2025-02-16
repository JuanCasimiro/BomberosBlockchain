// filepath: /c:/Users/Usuario/Desktop/WorkingDirectory/NFTMintPage/nft-mint-page/src/components/MintSection.jsx
import React from 'react';
import { FaEthereum } from 'react-icons/fa';

const MintSection = ({ mintQuantity, setMintQuantity, isMinting, error, onMint }) => {
  return (
    <section className="max-w-4xl mx-auto p-6 bg-slate-800 rounded-xl shadow-xl mb-12">
      <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl font-bold mb-4">Mint Your NFT</h3>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <input
              type="range"
              min="1"
              max="5"
              value={mintQuantity}
              onChange={(e) => setMintQuantity(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm mt-2">
              <span>1</span>
              <span>5</span>
            </div>
          </div>
          <div className="flex justify-between mb-6">
            <span>Price per NFT:</span>
            <span className="flex items-center gap-1">
              <FaEthereum /> 0.05 ETH
            </span>
          </div>
          <button
            onClick={onMint}
            disabled={isMinting}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg transition-all disabled:opacity-50"
          >
            {isMinting ? "Minting..." : "Mint Now"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        <div className="w-full md:w-1/2 bg-slate-700 p-6 rounded-xl">
          <h4 className="text-xl font-bold mb-4">Collection Stats</h4>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total Supply:</span>
              <span>10,000</span>
            </div>
            <div className="flex justify-between">
              <span>Minted:</span>
              <span>5,238</span>
            </div>
            <div className="flex justify-between">
              <span>Remaining:</span>
              <span>4,762</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MintSection;