import React from "react";
import { FaFire, FaHome, FaDove } from "react-icons/fa";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";

const InformativePage = () => {
  const stats = [
    { icon: <FaFire />, value: "150.000", label: "Hectáreas Quemadas", color: "text-red-500" },
    { icon: <FaHome />, value: "5.000", label: "Familias Afectadas", color: "text-orange-500" },
    { icon: <FaDove />, value: "200+", label: "Especies en Riesgo", color: "text-amber-500" }
  ];

  const testimonials = [
    {
      id: 1,
      name: "María Rodríguez",
      text: "Los incendios forestales nos quitaron todo. Necesitamos actuar para preservar nuestro futuro."
    },
    {
      id: 2,
      name: "Pablo Sánchez",
      text: "Hemos vivido aquí por generaciones. Ahora debemos proteger lo que queda."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Impacto de los Incendios Forestales</h2>
          <p className="text-lg text-gray-600 mt-4">
            Los incendios forestales han tenido un impacto devastador en nuestra región. Aquí hay algunas estadísticas clave que muestran la magnitud del problema.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-xl shadow-lg text-center"
            >
              <div className={`text-4xl mb-4 ${stat.color} flex justify-center`}>{stat.icon}</div>
              <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">La Situación Actual</h2>
          <div className="max-w-4xl mx-auto text-lg text-gray-700 space-y-6">
            <p>Los incendios forestales en la Patagonia representan una de las mayores crisis ambientales de nuestra región. La destrucción de estos ecosistemas únicos amenaza la biodiversidad y el futuro de numerosas comunidades locales.</p>
            <p>La situación se ha agravado en los últimos años debido a:</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>El cambio climático y las sequías prolongadas que han creado condiciones perfectas para la propagación de incendios</li>
              <li>La pérdida de más de 150.000 hectáreas de bosque nativo en el último año</li>
              <li>La destrucción del hábitat de especies endémicas, algunas en peligro de extinción</li>
              <li>El impacto en la calidad del aire y la salud de las comunidades cercanas</li>
            </ul>
            <p className="mt-6">Las consecuencias a largo plazo incluyen:</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>Erosión del suelo y pérdida de fertilidad en las zonas afectadas</li>
              <li>Alteración de los ciclos naturales del agua y los patrones de lluvia</li>
              <li>Impacto en la economía local, especialmente en el turismo y la agricultura</li>
              <li>Pérdida de servicios ecosistémicos fundamentales para la región</li>
            </ul>
            <p className="mt-6">Es fundamental implementar medidas preventivas y desarrollar planes de restauración para las áreas afectadas.</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Testimonios de la Comunidad</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg p-8"
            >
              <p className="text-gray-600 italic mb-4 text-lg">"{testimonial.text}"</p>
              <p className="font-semibold text-gray-800">{testimonial.name}</p>
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

export default InformativePage;
