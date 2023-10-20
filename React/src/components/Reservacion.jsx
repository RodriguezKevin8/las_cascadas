import React, { useState } from "react";
import "../css/Reservacion.css";
import { useNavigate } from "react-router-dom";

export default function Reservacion() {
  const navigate = useNavigate();
  const [data, setTipoHabitacion] = useState("individual");

  const handleTipoHabitacionChange = (e) => {
    setTipoHabitacion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Tipo de Habitación Seleccionada:", data);
  };

  return (
    <div>
      <h1 className="h1">Reservacion</h1>
      <div className="Reservacion container">
        <form className="Rform" onSubmit={handleSubmit}>
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
            <select
              name="tipoHabitacion"
              id="fecha"
              className="Rform__select select"
              value={data}
              onChange={handleTipoHabitacionChange}
            >
              <option value="individual">Individual</option>
              <option value="doble">Doble</option>
              <option value="suite">Suite</option>
            </select>
          </div>
          <div className="Rform__campo Rbtn">
            <input
              className="Reserv_btn-Buscar"
              type="submit"
              value={"Buscar"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
