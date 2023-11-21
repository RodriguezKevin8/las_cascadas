import React, { useState } from "react";
import axios from "axios";
import "../css/ReservacionComponente.css";

const ReservacionComponente = () => {
  const [comprobante, setComprobante] = useState("");
  const [reservacion, setReservacion] = useState([]);
  const [error, setError] = useState(null);

  const handleComprobanteChange = (event) => {
    setComprobante(event.target.value);
  };

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handleBuscarClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/detallescliente/${comprobante}`
      );
      setReservacion(response.data);
      setError(null);
    } catch (error) {
      setError("No existe una reservación con este número de comprobante");
      setReservacion([]);
    }
  };

  const handleEliminarClick = async (idReservacion) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/eliminarReservacion/${idReservacion}`
      );
      alert("Reservacion eliminada");
    } catch (error) {
      console.error("Error al eliminar la reservación:", error);
    }
  };

  return (
    <div className="reservacion-container">
      <h2>Buscar Reservación</h2>
      <label htmlFor="comprobante">Número de Comprobante:</label>
      <input
        type="text"
        id="comprobante"
        value={comprobante}
        onChange={handleComprobanteChange}
      />
      <button onClick={handleBuscarClick}>Buscar</button>

      {reservacion.map((reserva, index) => (
        <div className="reservacion" key={index}>
          <h3>Nombre: {reserva.nombre}</h3>
          <h3>Correo electrónico: {reserva.correo_electronico}</h3>
          <h3>Fecha de entrada: {formatFecha(reserva.fecha_entrada)}</h3>
          <h3>Fecha de salida: {formatFecha(reserva.fecha_salida)}</h3>
          <h3>Total: {reserva.total}</h3>
          <button onClick={() => handleEliminarClick(reserva.id_reservacion)}>
            Eliminar Reservación
          </button>
        </div>
      ))}

      {error && <p>{error}</p>}
    </div>
  );
};

export default ReservacionComponente;
