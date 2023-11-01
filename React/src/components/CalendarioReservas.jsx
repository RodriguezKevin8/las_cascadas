import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import axios from "axios";

const localizer = momentLocalizer(moment);

const ReservasCalendar = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/fechasEntrada")
      .then((response) => {
        setReservas(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las fechas de entrada:", error);
      });
  }, []);

  const eventos = reservas.map((reserva) => ({
    title: "Reservado",
    start: new Date(reserva.fecha_entrada),
    end: new Date(reserva.fecha_salida),
    allDay: true,
  }));

  return (
    <div>
      <h2>Calendario de Reservas</h2>
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 350, width: "600px" }}
      />
    </div>
  );
};

export default ReservasCalendar;
