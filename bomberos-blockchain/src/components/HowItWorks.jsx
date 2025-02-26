import React from "react";
import { FaWallet, FaFireExtinguisher, FaHandHoldingHeart } from "react-icons/fa";

const HowItWorks = () => (
  <div className="bg-gray-50 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        Cómo Funciona
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaWallet className="text-2xl text-red-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Conecta tu Billetera</h3>
          <p className="text-gray-600">Conecta tu billetera MetaMask para comenzar</p>
        </div>
        <div className="text-center">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaFireExtinguisher className="text-2xl text-red-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Elige una Campaña</h3>
          <p className="text-gray-600">Selecciona una estación de bomberos para apoyar</p>
        </div>
        <div className="text-center">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaHandHoldingHeart className="text-2xl text-red-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Marca la Diferencia</h3>
          <p className="text-gray-600">Contribuye con ETH para ayudar a salvar vidas</p>
        </div>
      </div>
    </div>
  </div>
);

export default HowItWorks;