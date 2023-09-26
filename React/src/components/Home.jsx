import React from "react";
import "../css/Home.css";
import { Row, Col } from "react-bootstrap";
import foto1 from "../images/foto1.jpg";
import habitacion from "../images/habitacion.jpg";

const Home = () => {
  return (
    <div className="seccion1">
      <div className="seccion1 parte1">
        <Row>
          <Col md={12}>
            <div id="main">
              <div className="max-65">
                <div className="max-708">
                  <h2 className="heading dark-text left ts">
                    ¡VEN Y DISFRUTA!
                  </h2>
                </div>
                <p className="body dark-text center dt">
                  Ubicados en Santa Ana, El Salvador. El parque cuenta con una
                  variedad de atracciones acuáticas, incluyendo toboganes,
                  piscinas y un río lento. También cuenta con un hotel adjunto
                  que ofrece alojamiento para los huéspedes que desean pasar la
                  noche.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="fondoh">
        <Row>
          <Col sm={12} md={6}>
            <img
              src={foto1}
              className="img-fluid"
              alt="Toboganes en el parque acuático Las Cascadas"
            />
          </Col>
          <Col sm={12} md={6}>
            <div className="text-center mb-3 seccion1">
              <h2 className="textoh">Las Cascadas</h2>
            </div>
            <p className="text-justify textoh seccion1 dt mt-2">
              El parque cuenta con una variedad de toboganes para todas las
              edades, desde toboganes para niños hasta toboganes de alta
              velocidad. Algunos de los toboganes más populares incluyen el
              "Tobogán de la Muerte", que es un tobogán vertical de 120 pies de
              altura, y el "Tobogán de los Piratas", que es un tobogán de 60
              pies de altura con efectos especiales.
              <br />
              <br />
              Las Cascadas es un destino popular para familias y grupos de
              amigos. El parque ofrece una variedad de atracciones acuáticas
              para todas las edades, así como alojamiento cómodo para aquellos
              que desean pasar la noche.
            </p>
          </Col>
        </Row>
      </div>
      <div className="seccion1 parte1 parte1-1">
        <Row>
          <Col md={12}>
            <div id="main">
              <div className="max-65">
                <div className="max-708">
                  <h2 className="heading dark-text left">
                    ¡Contamos con hospedaje!
                  </h2>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="parte1">
        <div className="row">
          <div
            className="col-md-6 text-center mb-3 seccion1"
            style={{ backgroundColor: "#EEEFEB" }}
          >
            <h2 className="mb-3">Habitaciones</h2>
            <p className="texto mb-5 parrafo1 dt">
              La comodidad de tu habitación te permite disfrutar de ellas desde
              un nuevo ángulo. Las habitaciones con vista a las piscinas son una
              excelente opción para los huéspedes que buscan disfrutar de un
              ambiente tranquilo y relajante. Estas habitaciones suelen ser más
              espaciosas que las habitaciones estándar, y cuentan con grandes
              ventanales que ofrecen una vista panorámica de la piscina
            </p>
            <button className="btn btn-primary">Reservar</button>
          </div>
          <div className="col-md-6">
            <img src={habitacion} alt="Imagen" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
