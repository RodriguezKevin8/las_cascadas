import Habitacion from "../images/habitacion.avif";
import "../css/fmrRservacion.css";
import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import axios from "axios";

function fmrReservacion() {
  const { id } = useParams();
  const idHabitacion = parseInt(id);
  const localizer = momentLocalizer(moment);
  const [habitacion, setHabitacion] = useState({});
  const [reservas, setReservas] = useState([]);
  const [reservacion, setReservacion] = useState({
    nombre: "",
    apellido: "",
    correo_electronico: "",
    telefono: "",
    id_habitacion: 54,
    fecha_entrada: "",
    fecha_salida: "",
    estado: "Activo",
    comprobante: Math.floor(100000 + Math.random() * 900000).toString(),
    total: 0,
  });

  let precio1;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/fechasEntrada/${id}`)
      .then((response) => {
        setReservas(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las fechas de entrada:", error);
      });
    fetch(`http://localhost:3000/api/detalleshabitacion1/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from API:", data);
        setHabitacion(data);
      })
      .catch((error) => console.error("Error:", error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservacion({ ...reservacion, [name]: value });
  };
  const calcularDiferenciaDias = () => {
    const fechaEntrada = new Date(reservacion.fecha_entrada);
    const fechaSalida = new Date(reservacion.fecha_salida);
    const diferenciaTiempo = fechaSalida - fechaEntrada;
    const diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));
    precio1 = diferenciaDias * habitacion.precio;
    return diferenciaDias;
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
          precio: precio1,
        }
      );
      console.log("Reservación creada:", response.data);
    } catch (error) {
      console.error("Error al crear la reservación:", error);
    }
  };

  const eventos = reservas.map((reserva) => ({
    title: "Reservado",
    start: new Date(reserva.fecha_entrada),
    end: new Date(reserva.fecha_salida),
    allDay: true,
  }));

  return (
    <div>
      <div className="detalles">
        <img
          src={`http://localhost:3000/api/images/${
            habitacion.fotos && habitacion.fotos.length > 0
              ? habitacion.fotos[0].foto1
              : ""
          }`}
          alt="Foto 2"
          className="img__habitacion"
        />

        <div className="detalles__info">
          <div className="info__detalle">
            <span>precio:</span>
            <p>${habitacion.precio}</p>
          </div>
          <div className="info__detalle">
            <span>Numero Habitacion:</span>
            <p>{habitacion.numero}</p>
          </div>
          <div className="info__detalle">
            <span>Tipo:</span>
            <p>{habitacion.tipo}</p>
          </div>
          <div className="info__detalle">
            <span>Capacidad:</span>
            <p>{habitacion.capacidad}</p>
          </div>
        </div>
      </div>

      <div>
        <h2>Calendario de Reservas</h2>
        <Calendar
          localizer={localizer}
          events={eventos}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 350, width: "600px", display: "flex" }}
        />
      </div>

      {/*<form className="frmReservacion">
        <div className="frmReservacion__campo">
          <label className="frmReservacion__label" htmlFor="nombre">
            Nombre
          </label>
          <input className="frm__input" type="text" id="nombre" />
        </div>
        <div className="frmReservacion__campo">
          <label className="frmReservacion__label" htmlFor="numero">
            Numero
          </label>
          <input className="frm__input" type="tel" id="numero" />
        </div>
        <div className="frmReservacion__campo">
          <label className="frmReservacion__label" htmlFor="email">
            E-mail
          </label>
          <input className="frm__input" type="email" id="email" />
        </div>
        <div className="especificaciones">
          <div className="espc__detalle">
            <span>TSub Total:</span>
            <p>$20</p>
          </div>
          <div className="espc__detalle">
            <span>Cargo Por Servicio:</span>
            <p>$2</p>
          </div>
          <div className="espc__detalle">
            <span>TSub Total:</span>
            <p>$22</p>
          </div>
        </div>
        <div className="frmReservacion__campo  ">
          <input type="submit" value={"Reservar"} className="boton enviar" />
          <Link to={"/"}>
            <button className="boton regresar">Cancelar</button>
          </Link>
        </div>
        </form>*/}
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
          <p>Días de reserva: {calcularDiferenciaDias()}</p>

          <button type="submit">Guardar Reservación</button>
        </form>
      </div>
    </div>
  );
}

export default fmrReservacion;
