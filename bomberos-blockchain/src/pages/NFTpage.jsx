import React, { useEffect, useState } from 'react';
import { getMintedTokens } from '../utils/contractServices';
import { toast } from 'react-toastify';

const NFTPage = ({ account }) => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const tokens = await getMintedTokens(account);
        setNfts(tokens);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
        toast.error("Error al obtener los NFTs");
      }
    };

    if (account) {
      fetchNFTs();
    }
  }, [account]);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Mis NFTs</h2>
        {nfts.length === 0 ? (
          <p className="text-center text-gray-500">No tienes NFTs.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {nfts.map((nft, index) => (
              <div key={index} className="bg-white rounded-lg shadow-xl overflow-hidden">
                <img src={nft.image} alt={nft.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{nft.name}</h3>
                  <p className="text-gray-600 mb-4">{nft.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTPage;