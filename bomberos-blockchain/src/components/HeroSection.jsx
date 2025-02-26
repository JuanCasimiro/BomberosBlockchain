import React from 'react';

const HeroSection = ({ scrollToCampaigns }) => (
  <div className="relative bg-gray-900 py-32 mt-16">
    <div className="absolute inset-0 overflow-hidden">
      <img
        src="https://cdn.eldestapeweb.com/eldestape/022025/1739542300956/whatsapp-image-2025-02-11-at-21-01-05-jpeg..webp?cw=853&ch=1280&extw=jpeg"
        alt="Fondo de Bomberos"
        className="w-full h-full object-cover opacity-60"
      />
    </div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
        Apoye a Nuestros Bomberos
      </h1>
      <p className="text-xl md:text-2xl text-gray-300 mb-8">
        Ayude a los bomberos de Argentina a obtener el equipamiento necesario para salvar vidas
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105">
          Donar Ahora
        </button>
        <button 
          onClick={scrollToCampaigns}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105">
          Ver Campañas
        </button>
      </div>
    </div>
  </div>
);

export default HeroSection;