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
      <div className="comentarios">
        {Reportereservacion.map((comentario) =>(
            <div className="Usuario" key={comentario.id_reportecomentario}>
                <p><b>Usuario: </b>{comentario.nombre}</p>
                <p><b>Comentario:</b><br />{comentario.detalle}</p>
            </div>
        ))}
      </div>
    </div>
  );
}
