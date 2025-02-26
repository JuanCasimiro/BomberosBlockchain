import React from 'react';
import { FaEthereum } from 'react-icons/fa';

const CampaignCard = ({ campaign, openModal }) => {
  // Convertir campaign.deadline a número
  const deadline = Number(campaign.deadline);
  
  // Obtener el tiempo restante (en milisegundos)
  const timeRemaining = deadline * 1000 - Date.now();
  
  // Calcular días, horas, minutos
  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

  // Si el tiempo ya pasó, mostrar "Finalizado"
  const isExpired = timeRemaining <= 0;

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
      <img
        src={campaign.imageUrl} // Usar la imagen asociada a la campaña
        alt={campaign.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{campaign.title}</h3>
        <p className="text-gray-600 mb-4">{campaign.description}</p>
        
        {/* Mostrar el tiempo restante si no ha expirado */}
        {!isExpired ? (
          <div className="text-sm text-gray-500">
            <p>Tiempo restante: {daysRemaining} días, {hoursRemaining} horas, {minutesRemaining} minutos</p>
          </div>
        ) : (
          <div className="text-sm text-gray-500">
            <p className="text-red-600">¡Campaña Finalizada!</p>
          </div>
        )}
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>{campaign.fundsRaised} ETH recaudados</span>
            <span>{campaign.goal} ETH objetivo</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-600 rounded-full h-2"
              style={{ width: `${(campaign.fundsRaised / campaign.goal) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <button
          onClick={() => openModal(campaign)} // Usar openModal con la campaña completa
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center"
        >
          <FaEthereum className="mr-2" /> Donar Ahora
        </button>
      </div>
    </div>
  );
};

export default CampaignCard;