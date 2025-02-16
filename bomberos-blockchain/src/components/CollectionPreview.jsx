import React from 'react';
import NFTCard from './NFTCard';

const CollectionPreview = ({ nftCollection }) => {
  return (
    <section className="max-w-6xl mx-auto p-6">
      <h3 className="text-2xl font-bold mb-8">Collection Preview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {nftCollection.map((nft) => (
          <NFTCard key={nft.id} nft={nft} />
        ))}
      </div>
    </section>
  );
};

export default CollectionPreview;
