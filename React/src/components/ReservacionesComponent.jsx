import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/ReservacionesComponent.css";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "../css/fmrRservacion.css";

function ReservacionesComponent() {
  const { id } = useParams();
  const idHabitacion = parseInt(id);
  const [reservas, setReservas] = useState([]);
  const localizer = momentLocalizer(moment);
  const [habitacion, setHabitacion] = useState({});
  const navigate = useNavigate();
  const [reservacion, setReservacion] = useState({
    nombre: "",
    apellido: "",
    correo_electronico: "",
    id_habitacion: idHabitacion,
    fecha_entrada: "",
    fecha_salida: "",
    estado: "Activo",
    comprobante: Math.floor(100000 + Math.random() * 900000).toString(),
    telefono: "",
    total: 0,
  });

  useEffect(() => {
    fetch(`http://localhost:3000/api/detalleshabitacion1/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from API:", data);
        setHabitacion(data);
      })
      .catch((error) => console.error("Error:", error));
    axios
      .get(`http://localhost:3000/api/fechasEntrada/${id}`)
      .then((response) => {
        setReservas(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las fechas de entrada:", error);
      });
  }, [id]);

  let precio1;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservacion({ ...reservacion, [name]: value });
  };

  const calcularDiferenciaDias = () => {
    const fechaEntrada = new Date(reservacion.fecha_entrada);
    const fechaSalida = new Date(reservacion.fecha_salida);
    const diferenciaTiempo = fechaSalida - fechaEntrada;
    const diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));
    return diferenciaDias + 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedFechaEntrada = new Date(
      reservacion.fecha_entrada
    ).toISOString();
    const formattedFechaSalida = new Date(
      reservacion.fecha_salida
    ).toISOString();

    const diasReserva = calcularDiferenciaDias();
    const total = diasReserva * habitacion.precio;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/reservacion",
        {
          ...reservacion,
          fecha_entrada: formattedFechaEntrada,
          fecha_salida: formattedFechaSalida,
          total: total,
        }
      );
      console.log("Reservación creada:", response.data);
      console.log("dato id ", response.data.id_reservacion);
      const fechaEntrada = response.data.fecha_entrada;
      const fechaFormateada = new Date(fechaEntrada)
        .toISOString()
        .split("T")[0];
      const fechaSalida = response.data.fecha_salida;
      const fechaFormateada2 = new Date(fechaSalida)
        .toISOString()
        .split("T")[0];
      navigate(
        `/final/${response.data.nombre}/${fechaFormateada}/${fechaFormateada2}/${response.data.total}/${response.data.comprobante}`
      );
    } catch (error) {
      console.error("Error al crear la reservación:", error);
    }
  };
  const eventos = reservas.map((reserva) => ({
    title: "Reservado",
    start: new Date(`${reserva.fecha_entrada}`),
    end: new Date(`${reserva.fecha_salida}`),
    allDay: true,
  }));
  eventos.forEach((evento) => {
    evento.end.setDate(evento.end.getDate() + 2);
  });

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
      <div className="reservaciones-container">
        {reservas.length > 0 && (
          <div>
            <h2>Calendario de Reservas</h2>
            <Calendar
              localizer={localizer}
              events={eventos}
              startAccessor="start"
              endAccessor="end"
              style={{
                height: 350,
                width: "100%",
                maxWidth: "600px",
                margin: "auto",
              }}
            />
          </div>
        )}
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

export default ReservacionesComponent;
