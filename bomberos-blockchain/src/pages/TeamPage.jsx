import React from "react";
import { FaFire, FaHome, FaDove } from "react-icons/fa";
import { motion } from "framer-motion";

const TeamPage = () => {
  const stats = [
    { icon: <FaFire />, value: "150.000", label: "Hectáreas Quemadas", color: "text-red-500" },
    { icon: <FaHome />, value: "5.000", label: "Familias Afectadas", color: "text-orange-500" },
    { icon: <FaDove />, value: "200+", label: "Especies en Riesgo", color: "text-amber-500" }
  ];

  const team = [
    {
      id: 1,
      name: "Juan Ignacio Casimiro",
      role: "Desarrollador Principal",
      description: "Desarrollado por Juan Ignacio Casimiro como parte de su portfolio Web3. Actualmente soy el único desarrollador en el proyecto y se aceptan colaboraciones.",
      email: "juanignaciocasimiro@gmail.com",
      github: "JuanCasimiro",
      linkedin: "Juan Ignacio Casimiro"
    }
  ];

  const collaborators = [
    {
      id: 1,
      name: "Estaciones de bomberos y ONG",
      description: "Colaboradores Autorizados: Estaciones de bomberos y ONG de las zonas damnificadas, a través de wallets en whitelist."
    }
  ];

  const faqs = [
    {
      id: 1,
      question: "¿Cómo puedo donar?",
      answer: "Puedes dirigirte a la página de donaciones y seguir las instrucciones. Al donar, se acuñará automáticamente un NFT como comprobante."
    },
    {
      id: 2,
      question: "¿Qué ocurre si no se alcanza la meta?",
      answer: "Si la meta de recaudación no se cumple, tendrás la opción de reclamar tu donación o dejarla para apoyar la causa."
    },
    {
      id: 3,
      question: "¿Quién puede crear campañas?",
      answer: "Solo las wallets en whitelist, pertenecientes a estaciones de bomberos y ONG de las zonas afectadas, pueden crear campañas."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Equipo y Colaboradores</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {team.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg p-8"
            >
              <h3 className="text-3xl font-bold mb-2">{member.name}</h3>
              <p className="text-gray-600 mb-4">{member.role}</p>
              <p className="text-gray-600 mb-4">{member.description}</p>
              <p className="text-gray-600 mb-4">Email: {member.email}</p>
              <p className="text-gray-600 mb-4">GitHub: {member.github}</p>
              <p className="text-gray-600 mb-4">LinkedIn: {member.linkedin}</p>
            </motion.div>
          ))}
          {collaborators.map((collaborator) => (
            <motion.div
              key={collaborator.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg p-8"
            >
              <h3 className="text-3xl font-bold mb-2">{collaborator.name}</h3>
              <p className="text-gray-600 mb-4">{collaborator.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">FAQ - Preguntas Frecuentes</h2>
        <div className="grid md:grid-cols-1 gap-8">
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg p-8"
            >
              <h3 className="text-3xl font-bold mb-2">{faq.question}</h3>
              <p className="text-gray-600 mb-4">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Juntos Podemos Hacer la Diferencia</h2>
          <p className="text-xl mb-8">Infórmate, comparte y concientiza sobre esta problemática ambiental.</p>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;