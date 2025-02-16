import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MintModal = ({ showModal, isMinting, onClose }) => {
  if (!showModal) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div className="bg-slate-800 p-6 rounded-xl max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Minting Status</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <FaTimes />
          </button>
        </div>
        <div className="text-center">
          {isMinting ? (
            <p>Minting in progress...</p>
          ) : (
            <p className="text-green-400">Successfully minted!</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MintModal;
