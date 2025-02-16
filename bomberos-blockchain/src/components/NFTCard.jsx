import React from 'react';
import { motion } from 'framer-motion';

const NFTCard = ({ nft }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-slate-800 rounded-xl overflow-hidden"
    >
      <img
        src={nft.image}
        alt={nft.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h4 className="text-lg font-bold">{nft.name}</h4>
        <p className="text-blue-400">{nft.rarity}</p>
      </div>
    </motion.div>
  );
};

export default NFTCard;
