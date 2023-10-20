import React from "react";
import "../css/FmrAgregar.css";
import Habitacion from "../images/habitacion.avif";

function FmrAgregar() {
  return (
    <div className="flex cont">
      <div className="grid">
        <div className="img_agregadas">
          <h3>Imagenes Agregadas</h3>
          <img src={Habitacion} alt="" />
          <img src={Habitacion} alt="" />
          <img src={Habitacion} alt="" />
        </div>
        <form action="">
          <div className="fmr_AgregarImg">
            <label for="imagen">Selecciona una imagen:</label>
            <input type="file" name="imagen" id="imagen" accept="image/*" />
            <input type="file" name="imagen" id="imagen" accept="image/*" />
            <input type="file" name="imagen" id="imagen" accept="image/*" />
          </div>
          <div className="fmr__Agregar">
            <label htmlFor="">Numero:</label>
            <input className="input" type="number" />
          </div>
          <div className="fmr__Agregar">
            <label htmlFor="">Tipo:</label>
            <input className="input" type="text" />
          </div>
          <div className="fmr__Agregar">
            <label htmlFor="">Capacidad:</label>
            <input className="input" type="number" />
          </div>
          <div className="fmr__Agregar">
            <label htmlFor="">Disponible: </label>
            <input type="checkbox" />
          </div>
          <div className="fmr__Agregar">
            <label htmlFor="">Descripcion:</label>
            <textarea className="input" name="" id=""></textarea>
          </div>
          <div className="fmr__Agregar">
            <label htmlFor="">Precio:</label>
            <input className="input" type="number" />
          </div>
          <div className="fmr__Agregar">
            <input
              className="boton btnAgregar"
              type="submit"
              value={"Agregar"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default FmrAgregar;
