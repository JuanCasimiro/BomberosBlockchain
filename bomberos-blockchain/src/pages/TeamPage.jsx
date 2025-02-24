import React from 'react';

function TeamPage() {
  return (
    <div>
      <h1>Equipo, FAQ y Contacto</h1>
      
      <section>
        <h2>Equipo y Colaboradores</h2>
        <p>
          Desarrollado por <strong>Juan Ignacio Casimiro</strong> como parte de su portfolio Web3. Actualmente soy el único desarrollador en el proyecto y se aceptan colaboraciones.
        </p>
        <p>
          <strong>Colaboradores Autorizados:</strong> Estaciones de bomberos y ONG de las zonas damnificadas, a través de wallets en whitelist.
        </p>
      </section>
      
      <section>
        <h2>FAQ - Preguntas Frecuentes</h2>
        <h3>¿Cómo puedo donar?</h3>
        <p>
          Puedes dirigirte a la página de donaciones y seguir las instrucciones. Al donar, se acuñará automáticamente un NFT como comprobante.
        </p>
        <h3>¿Qué ocurre si no se alcanza la meta?</h3>
        <p>
          Si la meta de recaudación no se cumple, tendrás la opción de reclamar tu donación o dejarla para apoyar la causa.
        </p>
        <h3>¿Quién puede crear campañas?</h3>
        <p>
          Solo las wallets en whitelist, pertenecientes a estaciones de bomberos y ONG de las zonas afectadas, pueden crear campañas.
        </p>
      </section>
      
      <section>
        <h2>Contacto</h2>
        <p>Para consultas y colaboraciones, contáctame a través de:</p>
        <ul>
          <li><strong>Email:</strong> [tu-email@example.com] {/* Reemplaza con tu email */}</li>
          <li>
            <strong>GitHub:</strong> <a href="https://github.com/JuanCasimiro" target="_blank" rel="noopener noreferrer">JuanCasimiro</a>
          </li>
          <li>
            <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/juanignaciocasimiro/" target="_blank" rel="noopener noreferrer">Juan Ignacio Casimiro</a>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default TeamPage;
