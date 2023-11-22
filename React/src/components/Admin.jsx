import React, { useState, useEffect } from "react";
import Habitacion from "../images/habitacion.avif";
import "../css/Admin.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Admin() {
  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/detalleshabitacion")
      .then((response) => response.json())
      .then((data) => setHabitaciones(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleActualizarDisponibilidad = async (id, disponibilidad) => {
    try {
      const nuevoEstado = disponibilidad === "Activo" ? "No activo" : "Activo";
      const response = await axios.put(
        `http://localhost:3000/api/disponibilidad/${id}`,
        {
          disponibilidad: nuevoEstado,
        }
      );

      if (response.status === 200) {
        const mensaje = `Acción realizada, el nuevo estado es: ${nuevoEstado}`;
        alert(mensaje);
        setHabitaciones((prevState) =>
          prevState.map((habitacion) =>
            habitacion.id_habitacion === id
              ? { ...habitacion, disponibilidad: nuevoEstado }
              : habitacion
          )
        );
      } else {
        console.error("Error al actualizar disponibilidad:", response);
      }
    } catch (error) {
      console.error("Error al actualizar disponibilidad:", error);
    }
  };

  return (
    <div className="flex mt-5">
      <Link to={`/FmrAgregar`}>
        <button className="btn">Agregar Habitacion</button>
      </Link>
      <Link to={`/reportecomentario`}>
        <button className="btn">Ver reporte comentario</button>
      </Link>
      <Link to={`/reportereserva`}>
        <button className="btn">Ver reporte reservaciones</button>
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
            </div>
            <div className="Admin__botones">
              <Link to={`/FmrEditar/${habitacion.id_habitacion}`}>
                <a>
                  <i className="bi bi-pencil-square"></i>
                </a>
              </Link>
              <a
                onClick={() =>
                  handleActualizarDisponibilidad(
                    habitacion.id_habitacion,
                    habitacion.disponibilidad
                  )
                }
              >
                <i className="bi bi-arrow-clockwise"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
