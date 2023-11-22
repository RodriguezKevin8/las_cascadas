import { useState, useEffect } from "react";
import axios from "axios";
import "../css/reportecoment.css";

export default function Reportecomentario() {
  const [Reportereservacion, setReportereservacion] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/commentData")
      .then((response) => response.json())
      .then((data) => setReportereservacion(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="container11">
      <h1>Comentarios</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Comentario</th>
          </tr>
        </thead>
        <tbody>
          {Reportereservacion.map((comentario) => (
            <tr key={comentario.id_reportecomentario}>
              <td>{comentario.id_reportecomentario}</td>
              <td>{comentario.nombre}</td>
              <td>{comentario.detalle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
