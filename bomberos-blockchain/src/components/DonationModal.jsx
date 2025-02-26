import React from "react";

const DonationModal = ({ selectedCampaign, donationAmount, setDonationAmount, handleContribute, closeModal }) => (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h3 className="text-xl font-bold mb-4">Donar a {selectedCampaign.stationName}</h3>
      <input
        type="number"
        value={donationAmount}
        onChange={(e) => setDonationAmount(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        placeholder="Ingresa la cantidad (ETH)"
      />
      <div className="flex justify-between">
        <button
          onClick={() => handleContribute(selectedCampaign.id, donationAmount)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
        >
          Contribuir
        </button>
        <button
          onClick={closeModal}
          className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-lg"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
);

export default DonationModal;