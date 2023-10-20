import React, { useState } from "react";
import axios from "axios";

import "../css/ReservacionesComponent.css";

function ReservacionesComponent() {
  const [reservacion, setReservacion] = useState({
    nombre: "",
    apellido: "",
    correo_electronico: "",
    id_habitacion: 49,
    fecha_entrada: "",
    fecha_salida: "",
    estado: "",
    comprobante: "ksksks",
    telefono: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservacion({ ...reservacion, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedFechaEntrada = new Date(
      reservacion.fecha_entrada
    ).toISOString();
    const formattedFechaSalida = new Date(
      reservacion.fecha_salida
    ).toISOString();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/reservacion",
        {
          ...reservacion,
          fecha_entrada: formattedFechaEntrada,
          fecha_salida: formattedFechaSalida,
        }
      );
      console.log("Reservación creada:", response.data);
    } catch (error) {
      console.error("Error al crear la reservación:", error);
    }
  };

  return (
    <div className="reservaciones-container">
      <h1>Crear Reservación</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={reservacion.nombre}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Apellido:
          <input
            type="text"
            name="apellido"
            value={reservacion.apellido}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Correo Electrónico:
          <input
            type="email"
            name="correo_electronico"
            value={reservacion.correo_electronico}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Teléfono:
          <input
            type="tel"
            name="telefono"
            value={reservacion.telefono}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Fecha de Entrada:
          <input
            type="date"
            name="fecha_entrada"
            value={reservacion.fecha_entrada}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Fecha de Salida:
          <input
            type="date"
            name="fecha_salida"
            value={reservacion.fecha_salida}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Estado:
          <input
            type="text"
            name="estado"
            value={reservacion.estado}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Comprobante:
          <input
            type="text"
            name="comprobante"
            value={reservacion.comprobante}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Guardar Reservación</button>
      </form>
    </div>
  );
}

export default ReservacionesComponent;
