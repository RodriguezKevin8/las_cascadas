import React from "react";
import "../css/FmrAgregar.css";
import Habitacion from "../images/habitacion.avif";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FmrAgregar() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [fotos, setFotos] = useState([]);
  const navigate = useNavigate();

  const fetchfotos = (id) => {
    axios
      .get(`http://localhost:3000/api/imagesdata/${id}`, fotos)
      .then((response) => {
        setFotos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener fotos:", error);
      });
  };

  useEffect(() => {
    fetchfotos();
  }, []);

  const [data, setData] = useState({
    numero: "",
    tipo: "",
    capacidad: "",
    descripcion: "",
    precio: "",
    disponibilidad: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const reset = () => {
    setData({
      numero: "",
      tipo: "",
      capacidad: "",
      descripcion: "",
      precio: "",
      disponibilidad: "",
    });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedImages(files);
  };

  const datas = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      if (token) {
        const response = await axios.post(
          "http://localhost:3000/api/insertHabitacion",
          {
            ...data,
            numero: parseInt(data.numero),
            capacidad: parseInt(data.capacidad),
            precio: parseFloat(data.precio),
          }
        );

        if (response.status === 200) {
          const idHabitacion = response.data.id_habitacion;
          console.log("Guardada con éxito. ID de habitación:", idHabitacion);

          await handleSubmit(idHabitacion);

          reset();
          alert("Habitacion generada con exito.");
        }
      } else {
        navigate("/admin749293");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Error con la información, favor de revisarla.");
      } else {
        alert("Ocurrió un error. Por favor, intenta de nuevo más tarde.");
        console.error(error);
      }
    }
  };

  const handleSubmit = async (id) => {
    const formData = new FormData();

    for (let i = 0; i < selectedImages.length; i++) {
      formData.append("images", selectedImages[i]);
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/upload/${id}`,
        formData
      );

      if (response.data.success) {
        console.log("Imágenes subidas con éxito");
        setSelectedImages([]);
        fetchfotos(id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex cont">
      <div className="grid">
        <div className="img_agregadas">
          <h3>Imagenes Agregadas</h3>
          {fotos.map((foto, index) => (
            <React.Fragment key={index}>
              <img
                src={`http://localhost:3000/api/images/${foto.foto1}`}
                alt={`Foto ${index}`}
              />
              <img
                src={`http://localhost:3000/api/images/${foto.foto2}`}
                alt={`Foto ${index}`}
              />
              <img
                src={`http://localhost:3000/api/images/${foto.foto3}`}
                alt={`Foto ${index}`}
              />
            </React.Fragment>
          ))}
        </div>
        <form onSubmit={datas}>
          <div className="fmr__Agregar">
            <label>Número:</label>
            <input
              id="numero"
              type="number"
              name="numero"
              value={data.numero}
              onChange={handleChange}
            />
          </div>
          <div className="fmr__Agregar">
            <div className="box">
              <label>Tipo:</label>
              <select
                id="tipo"
                className="input"
                name="tipo"
                value={data.tipo}
                onChange={handleChange}
              >
                <option value="individual">seleccionar</option>
                <option value="individual">Individual</option>
                <option value="doble">Doble</option>
                <option value="suite">Suite</option>
              </select>
            </div>
          </div>
          <div className="fmr__Agregar">
            <label>Capacidad:</label>
            <input
              type="number"
              name="capacidad"
              value={data.capacidad}
              onChange={handleChange}
            />
          </div>
          <div className="fmr__Agregar">
            <div className="box">
              <label>Estado:</label>
              <select
                id="tipo"
                className="input"
                name="disponibilidad"
                value={data.disponibilidad}
                onChange={handleChange}
              >
                <option value="activo">seleccionar</option>
                <option value="Activo">Activa</option>
                <option value="No activa">No activa</option>
              </select>
            </div>
          </div>
          <div className="fmr__Agregar">
            <label>Descripcion:</label>
            <textarea
              className="input"
              name="descripcion"
              value={data.descripcion}
              maxLength={300}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="fmr__Agregar">
            <label>Precio:</label>
            <input
              className="input"
              type="number"
              name="precio"
              value={data.precio}
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="fmr__Agregar">
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </div>
          <br />
          <div className="fmr__Agregar">
            <button className="boton btnAgregar" type="submit">
              Agregar
            </button>
          </div>
          <br />
        </form>
      </div>
    </div>
  );
}

export default FmrAgregar;
