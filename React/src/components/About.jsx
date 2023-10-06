import React from 'react';
import "../css/about.css"


function About() {
  return (
    <div className="sobre-nosotros-container">
      <div className="container sobre-nosotros-cards mediaFlex">
        <div className="card mb-3" style={{ maxWidth: '100%' }}>
          <div className="card-header">VISION</div>
          <div className="card-body">
            <h1 className="card-title">Nuestro Propósito</h1>
            <p className="card-text">
              Visión

              Ser el parque acuático líder en El Salvador, brindando experiencias de diversión y entretenimiento únicas para toda la familia.</p>
          </div>
        </div>
        <div className="card mb-3" style={{ maxWidth: '100%' }}>
          <div className="card-header">MISION</div>
          <div className="card-body">
            <h1 className="card-title">Nuestro Compromiso</h1>
            <p className="card-text">Proporcionar a nuestros visitantes un ambiente seguro y confortable, donde puedan disfrutar de atracciones y servicios de alta calidad, en un entorno natural y de belleza escénica..</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
