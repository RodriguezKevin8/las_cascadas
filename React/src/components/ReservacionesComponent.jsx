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
  const [showAlert, setShowAlert] = useState(false);
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

  const handleShowAlert = () => {
    setShowAlert(true);
  };

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
  const fechaActual = new Date().toISOString().split("T")[0];

  return (
    <div>
      <div className="detalles">
        <div className="carousel-container">
          <div
            id="carouselExampleAutoplaying"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={`http://localhost:3000/api/images/${
                    habitacion.fotos && habitacion.fotos.length > 0
                      ? habitacion.fotos[0].foto1
                      : ""
                  }`}
                  alt="Foto 1"
                  className="img__habitacion d-block w-100"
                />
              </div>
              <div className="carousel-item">
                <img
                  src={`http://localhost:3000/api/images/${
                    habitacion.fotos && habitacion.fotos.length > 0
                      ? habitacion.fotos[0].foto2
                      : ""
                  }`}
                  alt="Foto 2"
                  className="img__habitacion d-block w-100"
                />
              </div>
              <div className="carousel-item">
                <img
                  src={`http://localhost:3000/api/images/${
                    habitacion.fotos && habitacion.fotos.length > 0
                      ? habitacion.fotos[0].foto3
                      : ""
                  }`}
                  alt="Foto 3"
                  className="img__habitacion d-block w-100"
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className="detalles__info">
          <div className="info__detalle">
            <span style={{ textAlign: "left" }}>Precio:</span>
            <p style={{ textAlign: "left" }}>${habitacion.precio}</p>
          </div>
          <div className="info__detalle">
            <span style={{ textAlign: "left" }}>Número:</span>
            <p style={{ textAlign: "left" }}>{habitacion.numero}</p>
          </div>
          <div className="info__detalle">
            <span style={{ textAlign: "left" }}>Tipo:</span>
            <p style={{ textAlign: "left" }}>{habitacion.tipo}</p>
          </div>
          <div className="info__detalle">
            <span style={{ textAlign: "left" }}>Capacidad:</span>
            <p style={{ textAlign: "left" }}>{habitacion.capacidad}</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <div className="descripcion">
          <div className="info__detalle">
            <span>Descripción:</span>
            <p style={{ textAlign: "justify", padding: "10px" }}>
              {habitacion.descripcion}
            </p>
          </div>
        </div>
      </div>

      <div className="reservaciones-container">
        {reservas.length > 0 && (
          <div>
            <h2 style={{ textAlign: "center", marginBottom: "60px" }}>
              Calendario de Reservas
            </h2>
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
      </div>
      <div style={{ padding: "10px" }}>
        <div>
          <form onSubmit={handleSubmit} className="form__reservacion">
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                value={reservacion.nombre}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellido">Apellido:</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                required
                value={reservacion.apellido}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="correo_electronico">Correo Electrónico:</label>
              <input
                type="email"
                id="correo_electronico"
                name="correo_electronico"
                required
                value={reservacion.correo_electronico}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono:</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                required
                value={reservacion.telefono}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="fecha_entrada">Fecha de Entrada:</label>
              <input
                type="date"
                id="fecha_entrada"
                name="fecha_entrada"
                required
                min={fechaActual}
                value={reservacion.fecha_entrada}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="fecha_salida">Fecha de Salida:</label>
              <input
                type="date"
                id="fecha_salida"
                name="fecha_salida"
                required
                min={fechaActual}
                value={reservacion.fecha_salida}
                onChange={handleInputChange}
              />
            </div>

            <p>Días de reserva: {calcularDiferenciaDias()}</p>
            <button type="submit">Guardar Reservación</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReservacionesComponent;
