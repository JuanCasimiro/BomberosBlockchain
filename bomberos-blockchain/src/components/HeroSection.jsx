import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="py-20 px-4 text-center bg-gradient-to-b from-slate-800 to-slate-900">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold mb-6"
      >
        Discover Unique Digital Art
      </motion.h2>
      <p className="text-xl text-gray-400 mb-8">Mint your exclusive NFT today</p>
    </section>
  );
};

export default HeroSection;
