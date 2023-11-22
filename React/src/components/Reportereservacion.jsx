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
        <table className="scrollable-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Telefono</th>
              <th>Correo electronico</th>
              <th>Fecha entrada</th>
              <th>Fecha salida</th>
              <th>Comprobante</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Reportereserva.map((reserva) => (
              <tr key={reserva.id_reservacion}>
                <td>{reserva.id_reservacion}</td>
                <td>{reserva.nombre + " " + reserva.apellido}</td>
                <td>{reserva.telefono}</td>
                <td>{reserva.correo_electronico}</td>
                <td>{formatFecha(reserva.fecha_entrada)}</td>
                <td>{formatFecha(reserva.fecha_salida)}</td>
                <td>{reserva.comprobante}</td>
                <td>${reserva.total}</td>
                <td>
                  <button
                    onClick={() => handleEliminarClick(reserva.id_reservacion)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
