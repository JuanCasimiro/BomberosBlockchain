import React from 'react';

function LandingPage() {
  return (
    <div>
      <h1>Proyecto Web3 para Incendios Forestales en la Patagonia</h1>
      
      <section>
        <h2>Información y Contexto</h2>
        <p>
          Los incendios forestales en el sur de Argentina han tenido un impacto significativo en las provincias de Río Negro y Neuquén.
        </p>
        <ul>
          <li><strong>Área Afectada:</strong> Más de 15,000 hectáreas de bosques nativos (a partir del 11 de febrero de 2025).</li>
          <li><strong>Víctimas:</strong> 1 víctima fatal (Ángel Reyes, 84 años) y 120 viviendas destruidas, afectando a más de 500 familias, especialmente en El Bolsón.</li>
          <li><strong>Impacto en la Fauna:</strong> Especies como capibaras, lobos de río, yacarés y ciervos han sufrido pérdidas significativas.</li>
        </ul>
        <p><em>Fuente: ELPAIS.COM, ES.WIKIPEDIA.ORG</em></p>
      </section>
      
      <section>
        <h2>Whitepaper</h2>
        <p>
          <strong>Introducción:</strong> Este proyecto surge ante la alarmante situación de incendios en la Patagonia y busca recaudar fondos de manera transparente mediante tecnología blockchain.
        </p>
        <p>
          <strong>Solución Propuesta:</strong> Utilizamos smart contracts para distribuir los fondos de manera transparente. Cada donación genera automáticamente un NFT como comprobante, y si no se alcanza la meta, los donantes podrán reclamar su aporte o dejarlo para seguir apoyando la causa.
        </p>
        <p>
          <strong>Funcionamiento Técnico:</strong> Las campañas sólo pueden ser creadas por wallets en whitelist (estaciones de bomberos y ONG de las zonas damnificadas). La transparencia se garantiza a través de auditorías en tiempo real en la blockchain.
        </p>
      </section>
      
      <section>
        <h2>Roadmap y Noticias</h2>
        <ul>
          <li><strong>Fase 1:</strong> Desarrollo e integración del smart contract y la plataforma de donaciones.</li>
          <li><strong>Fase 2:</strong> Implementación del sistema de minting de NFTs y pruebas de auditoría.</li>
          <li><strong>Fase 3:</strong> Lanzamiento oficial y monitoreo de la campaña.</li>
          <li><strong>Fase 4:</strong> Actualizaciones periódicas a través de redes sociales y la incorporación de una página de noticias.</li>
        </ul>
      </section>
    </div>
  );
}

export default LandingPage;
