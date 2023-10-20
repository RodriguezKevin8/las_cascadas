import React, { useState, useEffect } from "react";
import axios from "axios";
import Habitacion from "../images/habitacion.avif";
import "../css/Habitaciones.css";
import { Link } from "react-router-dom";
import "../css/Reservacion.css";

export default function ResHabitaciones() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [tipoFiltro, setTipoFiltro] = useState("todos");

  useEffect(() => {
    fetch("http://localhost:3000/api/detalleshabitacion")
      .then((response) => response.json())
      .then((data) => setHabitaciones(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleChange = (e) => {
    setTipoFiltro(e.target.value);
  };

  const habitacionesFiltradas = habitaciones.filter((habitacion) => {
    if (tipoFiltro === "todos" && habitacion.disponibilidad === "Activo") {
      return true;
    }
    return (
      habitacion.tipo === tipoFiltro && habitacion.disponibilidad === "Activo"
    );
  });

  return (
    <div>
      <div className="filtros">
        <h1 className="h1">Reservacion</h1>
        <div className="Reservacion container">
          <form className="Rform">
            <div className="Rform__campo">
              <label htmlFor="fecha" className="Rform__label">
                Fecha
              </label>
              <input type="date" className="Rform__select" />
            </div>
            <div className="Rform__campo">
              <label htmlFor="fecha" className="Rform__label">
                Tipo de Habitacion
              </label>
              <select value={tipoFiltro} onChange={handleChange}>
                <option value="todos">Todos</option>
                <option value="individual">Individual</option>
                <option value="doble">Doble</option>
                <option value="suite">Suite</option>
              </select>
            </div>
            <div className="Rform__campo Rbtn">
              <input
                className="Reserv_btn-Buscar"
                type="button"
                value={"Buscar"}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="flex">
        <div className="habitaciones">
          {habitacionesFiltradas.map((habitacion, index) => (
            <div className="habitacion" key={index}>
              <div className="cara adelante">
                <img
                  src={`http://localhost:3000/api/images/${habitacion.fotos[0].foto1}`}
                  alt=""
                  className="img__habitacion"
                />
                <div className="habitacion__contenido">
                  <h3 className="habitacion__titulo">{habitacion.titulo}</h3>
                  <p className="habitacion__texto">{habitacion.descripcion}</p>
                  <div className="habitacion__botones">
                    <p>Mostrar Detalles</p>
                  </div>
                </div>
              </div>
              <div className="atras">
                <h3>Detalle</h3>
                <p>{habitacion.detalle}</p>
                <Link to={"/reservarContenedor"}>
                  <button className="boton btn__reservar">Reservar</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
