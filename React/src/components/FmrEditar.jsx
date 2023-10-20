import "../css/FmrAgregar.css";
import React from "react";
import Habitacion from "../images/habitacion.avif";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function FmrEditar() {
  const { id } = useParams();
  const [selectedImages, setSelectedImages] = useState([]);
  const [fotos, setFotos] = useState([]);
  const [data, setData] = useState({
    disponibilidad: "",
    precio: "",
    descripcion: "",
  });

  const fetchfotos = (id) => {
    axios
      .get(`http://localhost:3000/api/imagesdata/${id}`, fotos)
      .then((response) => {
        setFotos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener libros:", error);
      });
  };
  useEffect(() => {
    fetchfotos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedImages(files);
  };

  const reset = () => {
    setData({
      disponibilidad: "",
      precio: "",
      descripcion: "",
    });
  };

  const datas = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/habitacion/${id}`, data);
      await handleSubmit(id);
      reset();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Error con la información, favor de revisarla.");
      } else {
        alert("Ocurrió un error. Por favor, intenta de nuevo más tarde.");
        console.log(error);
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
        </div>
        <form onSubmit={datas}>
          <div className="fmr_AgregarImg">
            <label for="imagen">Selecciona una imagen:</label>
            <form>
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
            </form>
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
          <div className="fmr__Agregar">
            <input
              className="boton btnAgregar"
              type="submit"
              value={"Editar"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default FmrEditar;
