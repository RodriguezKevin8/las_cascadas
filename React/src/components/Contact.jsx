import React, { useState } from "react";
import axios from "axios";
import "../css/Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    detalle: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/api/comment", formData)
      .then((response) => {
        console.log("Comentario enviado:", response.data);
        // Resetear los campos después de enviar
        setFormData({
          nombre: "",
          detalle: "",
        });
      })
      .catch((error) => {
        console.error("Error al enviar el comentario:", error);
      });
  };

  return (
    <div className="contacto">
      <h2 className="titulo__contactanos">Envianos un mensaje!</h2>
      <div className="contacto-bg">
        <div className="opacidad-contactos"></div>
      </div>
      <form className="formulario" onSubmit={handleSubmit}>
        <div className="formulario__campo">
          <label className="formulario__label" htmlFor="nombre">
            Nombre
          </label>
          <input
            className="input"
            type="text"
            id="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="formulario__campo">
          <label className="formulario__label" htmlFor="mensaje">
            Mensaje
          </label>
          <textarea
            className="input"
            id="detalle"
            value={formData.detalle}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="formulario__campo  ">
          <input type="submit" value={"Enviar"} className="boton enviar" />
          <button className="boton regresar">Regresar</button>
        </div>
      </form>
    </div>
  );
}

export default Contact;
