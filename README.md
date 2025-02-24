# Firefighter Crowdfunding

Plataforma de Donaciones Blockchain para Bomberos que garantiza transparencia, seguridad y eficiencia en la recaudación de fondos para apoyar a los héroes que protegen a nuestras comunidades.

---

## Tabla de Contenidos

- [Resumen](#resumen)
- [Introducción](#introducción)
- [Problema y Oportunidad](#problema-y-oportunidad)
- [Arquitectura del Sistema](#arquitectura-del-sistema)
- [Detalles Técnicos del Contrato](#detalles-técnicos-del-contrato)
- [Mecanismo de Incentivos (NFT)](#mecanismo-de-incentivos-nft)
- [Seguridad y Transparencia](#seguridad-y-transparencia)
- [Impacto y Beneficios para la Comunidad](#impacto-y-beneficios-para-la-comunidad)
- [Futuro y Roadmap](#futuro-y-roadmap)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Demo y Capturas de Pantalla](#demo-y-capturas-de-pantalla)
- [Guía de Uso y Casos de Uso](#guía-de-uso-y-casos-de-uso)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)
- [Contacto y Redes](#contacto-y-redes)
- [Notas Adicionales y Agradecimientos](#notas-adicionales-y-agradecimientos)

---

## Resumen

La plataforma utiliza tecnología blockchain para gestionar campañas de crowdfunding de forma descentralizada y transparente. A través de contratos inteligentes, se asegura que cada donación se registre de manera inmutable y se utilicen mecanismos automatizados para el retiro de fondos o reembolsos, según el resultado de cada campaña. Además, se premia a los donantes con tokens NFT que reconocen su compromiso y contribución acumulativa. **Cabe destacar que el NFT se emite no solo al alcanzar una donación única significativa, sino también al acumular aportes recurrentes que superen un umbral predefinido.**

---

## Introducción

Los bomberos enfrentan riesgos constantes y requieren recursos para equipamiento, capacitación y respuesta rápida ante emergencias. Sin embargo, la falta de transparencia y eficiencia en los procesos tradicionales de recaudación de fondos limita el apoyo necesario. Esta plataforma resuelve esos problemas utilizando contratos inteligentes en blockchain para gestionar campañas, garantizando transparencia, seguridad y eficiencia.

---

## Problema y Oportunidad

### Desafíos Actuales

- **Transparencia Limitada:** Los métodos tradicionales no permiten rastrear de forma pública el destino de los fondos.
- **Procesos Ineficientes:** La gestión manual retrasa la entrega de recursos urgentes.
- **Falta de Incentivos:** Los donantes a menudo no reciben un reconocimiento por su aporte.

### Oportunidades

- **Registro Inmutable:** Toda transacción se almacena en la blockchain, facilitando auditorías.
- **Automatización:** Los contratos inteligentes automatizan el retiro y reembolso de fondos.
- **Reconocimiento Integral:** La emisión de NFTs recompensa tanto donaciones únicas como contribuciones acumulativas, incentivando la participación continua.

---

## Arquitectura del Sistema

La plataforma se basa en un contrato inteligente desarrollado en Solidity, apoyándose en librerías de OpenZeppelin para garantizar robustez y seguridad. Los componentes clave incluyen:

- **Campañas de Donación:** Estructuras que contienen el creador, objetivo financiero, plazos de contribución y un periodo adicional de 15 días para reembolsos o retiros.
- **Registro de Contribuciones:** Almacenamiento del monto total aportado por cada donante en cada campaña.
- **Sistema de Whitelist:** Solo usuarios autorizados pueden crear campañas.
- **Mecanismos Automatizados:** Funciones para contribuir, retirar fondos o solicitar reembolsos, y emisión de NFTs cuando se cumplen los criterios establecidos.

---

## Detalles Técnicos del Contrato

El contrato `FirefighterCrowdfunding` implementa:

- **Creación de Campañas:**  
  Usuarios en whitelist pueden crear campañas especificando título, descripción, objetivo y duración. Cada campaña establece un periodo adicional de 15 días tras su cierre para gestionar los reembolsos o el retiro de fondos.

- **Contribución y Registro:**  
  Las donaciones se registran de forma individual y se suman para determinar si se alcanza el umbral requerido para activar beneficios adicionales.

- **Retiro y Reembolso:**  
  Si se alcanza la meta, el creador puede retirar los fondos después de la campaña. De lo contrario, los donantes pueden solicitar un reembolso durante el periodo establecido.

- **Integración de NFTs:**  
  La función interna de minting de NFTs premia a los donantes cuando su aporte acumulado supera un umbral determinado, utilizando el estándar ERC721.

---

## Mecanismo de Incentivos (NFT)

El sistema de incentivos NFT ha sido diseñado para reconocer el compromiso de los donantes de manera integral:

- **Umbral de Contribución Acumulada:**  
  Se establece un monto mínimo (por ejemplo, 1 ether) que, al ser superado en contribuciones acumuladas dentro de una campaña, activa la emisión automática de un NFT.

- **Reconocimiento Integral:**  
  No solo se mintea el NFT por una única donación significativa, sino que también se consideran las contribuciones recurrentes de cada donante. Esto significa que la suma de múltiples aportes puede alcanzar el umbral, premiando a aquellos que demuestran un compromiso sostenido con la causa.

Este enfoque fomenta tanto donaciones puntuales como un apoyo continuo, fortaleciendo el vínculo entre la comunidad y los bomberos.

---

## Seguridad y Transparencia

- **Registro Inmutable:** Toda transacción se almacena en la blockchain para facilitar auditorías y garantizar la transparencia.
- **Protección contra Vulnerabilidades:** Se utilizan mecanismos como `ReentrancyGuard` para prevenir ataques y asegurar que las transacciones se realicen de forma segura.
- **Control de Acceso:** La creación de campañas está restringida a usuarios autorizados mediante un sistema de whitelist.

---

## Impacto y Beneficios para la Comunidad

- **Para los Bomberos:**  
  Acceso rápido a fondos para mejorar equipamiento, capacitación y respuesta ante emergencias.

- **Para los Donantes:**  
  Garantía de que sus aportes se utilizan de manera correcta y transparente, además de recibir un NFT que simboliza su compromiso.

- **Para la Sociedad:**  
  Fomenta la participación ciudadana y refuerza la confianza en la gestión de donaciones para causas críticas.

---

## Futuro y Roadmap

### Próximas Etapas

- **Auditorías de Seguridad:** Realización de auditorías externas para fortalecer la confianza en el sistema.
- **Integración Multiplataforma:** Desarrollo de aplicaciones móviles y portales web para facilitar el seguimiento en tiempo real.
- **Expansión del Ecosistema NFT:** Implementación de beneficios adicionales para los poseedores de NFTs, como acceso a eventos exclusivos y reconocimientos especiales.

### Visión a Largo Plazo

Crear una red colaborativa que conecte a comunidades, organizaciones y gobiernos para transformar la gestión de donaciones y potenciar el apoyo a los bomberos a nivel global.

---

## Tecnologías Utilizadas

- **Lenguaje:** Solidity (v0.8.19)
- **Frameworks/Libs:** OpenZeppelin Contracts, Hardhat/Truffle (para testing y despliegue)
- **Frontend (si aplica):** React, Next.js, Ethers.js
- **Blockchain:** Ethereum (Testnet/Mainnet)
- **Herramientas:** MetaMask, Ganache

---

## Instalación y Ejecución

```bash
# Clona el repositorio
git clone https://github.com/tuusuario/firefighter-crowdfunding.git
cd firefighter-crowdfunding

# Instala las dependencias
npm install

# Compila el contrato
npx hardhat compile

# Ejecuta los tests
npx hardhat test

# Despliega en una red local (ejemplo: Hardhat Network)
npx hardhat run scripts/deploy.js --network localhost


## Demo y Capturas de Pantalla

Si deseas ver la plataforma en acción, visita la demo en vivo o revisa las capturas de pantalla:

- [Ver Demo en Vivo](https://bomberos-blockchain.vercel.app/)

---

## Guía de Uso y Casos de Uso

### Creación de Campañas

- **Usuarios Autorizados:**  
  Solo aquellos en whitelist pueden crear campañas.

- **Definición de la Campaña:**  
  El usuario define título, descripción, meta de recaudación y duración.

- **Período Adicional:**  
  Se establece un periodo extra de 15 días para gestionar retiros o reembolsos.

### Contribución

- **Donaciones:**  
  Los usuarios pueden contribuir a las campañas activas.

- **Registro de Aportes:**  
  Se suma el monto de cada donante y, al superar el umbral acumulado, se emite un NFT.

### Retiro y Reembolso

- **Retiro:**  
  Si la campaña es exitosa y alcanza la meta, el creador retira los fondos tras el cierre del período.

- **Reembolso:**  
  Si no se alcanza la meta, los donantes pueden solicitar el reembolso durante el periodo establecido.

---

## Contribuciones

Si deseas contribuir a este proyecto:

1. Realiza un fork del repositorio.
2. Crea una nueva rama para tu feature o bug fix.
3. Envía un pull request con una descripción detallada de los cambios.
4. Abre un issue si tienes dudas o sugerencias.

---

## Licencia

Este proyecto se distribuye bajo la licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más detalles.

---

## Contacto y Redes

- **Email:** tuemail@ejemplo.com
- **GitHub:** [JuanCasimiro](https://github.com/JuanCasimiro)
- **LinkedIn:** [JuanCasimiro](https://linkedin.com/in/JuanCasimiro)

---

## Notas Adicionales y Agradecimientos

- **Notas:**  
  - El NFT se emite no solo por una donación única, sino también al acumular contribuciones que superen el umbral establecido.
  - Se agradece a la comunidad de OpenZeppelin por sus excelentes herramientas y documentación.

- **Agradecimientos:**  
  Gracias a todos los colaboradores y a la comunidad Web3 por el apoyo y feedback constante.
