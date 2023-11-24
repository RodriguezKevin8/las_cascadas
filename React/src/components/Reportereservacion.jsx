import { useState, useEffect } from "react";
import "../css/report.css";
import axios from "axios";

export default function Reportereservacion() {
  const [Reportereserva, setReportereserva] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/reportereservacion")
      .then((response) => response.json())
      .then((data) => setReportereserva(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };
  const handleEliminarClick = async (idReservacion) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/eliminarReservacion/${idReservacion}`
      );
      alert("Reservacion eliminada");
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar la reservación:", error);
    }
  };

  return (
    <div className="container11">
      <h1 className="report-title">Reporte de reservaciones</h1>
      <div className="table-container">
        {Reportereserva.map((reserva) => (
          <div className="reservacion" key={reserva.id_reservacion}>
            <p>
              <b>Nombre: </b>
              {reserva.nombre + " " + reserva.apellido}
            </p>
            <p>
              <b>Telefono: </b>
              {reserva.telefono}
            </p>
            <p>
              <b>E-mail: </b>
              {reserva.correo_electronico}
            </p>
            <p>
              <b>Fecha entrada: </b>
              {formatFecha(reserva.fecha_entrada)}
            </p>
            <p>
              <b>Fecha salida: </b>
              {formatFecha(reserva.fecha_salida)}
            </p>
            <p>
              <b>Comprobante: </b>
              {reserva.comprobante}
            </p>
            <p>
              <b>Total: $</b>
              {reserva.total}
            </p>
            <button onClick={() => handleEliminarClick(reserva.id_reservacion)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
