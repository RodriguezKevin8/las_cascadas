import React, { useState, useEffect } from "react";
import Habitacion from "../images/habitacion.avif";
import "../css/Admin.css";
import { Link } from "react-router-dom";

function Admin() {
  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/detalleshabitacion")
      .then((response) => response.json())
      .then((data) => setHabitaciones(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  function Alerta(e) {
    if (false) {
      alert("La habitacion no se puede eliminar porque esta ocupada");
    } else {
      confirm("¿Desea eliminar la habitacion?");
    }
  }

  return (
    <div className="flex mt-5">
      <Link to={`/FmrAgregar`}>
        <button className="btn">Agregar Habitacion</button>
      </Link>
      <div className="habitaciones">
        {habitaciones.map((habitacion, index) => (
          
          <div className="habitacion" key={index}>
            <img
              src={`http://localhost:3000/api/images/${habitacion.fotos[0].foto1}`}
              alt=""
              className="img__habitacion"
            />
            <div className="habitacion__contenido">
              <h3 className="habitacion__titulo">{`Habitacion ${
                index + 1
              }`}</h3>
              <p className="habitacion__texto border_bottom">
                {habitacion.descripcion}
              </p>
            </div>
            <div className="Admin__botones">

              
              <Link to={`/FmrEditar/${habitacion.id_habitacion}`}>
                <a>
                  <i className="bi bi-pencil-square"></i>
                </a>
              </Link>
              <a onClick={Alerta}>
                <i className="bi bi-trash3-fill"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
