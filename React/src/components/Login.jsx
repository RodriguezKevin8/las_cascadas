import React from "react";
import { MDBContainer, MDBCard, MDBCardBody, MDBInput } from "mdb-react-ui-kit";
import { useState } from "react";
import Alert from "./Alert";
import { Link, Navigate } from "react-router-dom"; // Importa Link desde react-router-dom
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import axios from "axios";

function Login() {
  const [data, setData] = useState({
    correo: "",
    contrase_a: "",
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
      correo: "",
      contrase_a: "",
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!data.correo || !data.contrase_a) {
        alert("Por favor, complete todos los campos requeridos.");
        return;
      }
      const response = await axios.post(
        "http://localhost:3000/api/login",
        data
      );

      if (response.status === 200) {
        const token = response.data.token;
        if (token) {
          localStorage.setItem("token", token);
          navigate(`/Administrar`);
          reset();
        } else {
          alert("Error al obtener el token del servidor.");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Error con la información, favor de revisarla.");
      }
    }
  };
  return (
    <MDBContainer fluid>
      <div
        className="p-2 p-sm-5 p-md-5 p-lg-5 p-xl-5"
        style={{ height: "100px" }}
      ></div>
      <MDBCard
        className="mx-2 mx-sm-5 mx-md-5 mx-lg-5 mx-xl-5 mb-4 mb-sm-5 mb-md-5 mb-lg-5 mb-xl-5 p-4 p-sm-5 p-md-5 p-lg-5 p-xl-5 shadow-5"
        style={{
          background: "hsla(0, 0%, 100%, 0.8)",
          backdropFilter: "blur(30px)",
        }}
      >
        <MDBCardBody className="p-4 p-sm-5 p-md-5 p-lg-5 p-xl-5 text-center">
          <h2 className="fw-bold mb-4 mb-sm-5 mb-md-5 mb-lg-5 mb-xl-5 colora">
            Administrador
          </h2>
          <form onSubmit={handleSubmit}>
            <MDBInput
              wrapperClass="mb-4 mb-sm-5 mb-md-5 mb-lg-5 mb-xl-5"
              label="Email"
              id="email"
              name="correo"
              value={data.correo}
              onChange={handleChange}
            />
            <MDBInput
              wrapperClass="mb-4 mb-sm-5 mb-md-5 mb-lg-5 mb-xl-5"
              label="Password"
              id="password"
              type="password"
              name="contrase_a"
              value={data.contrase_a}
              onChange={handleChange}
            />

            <button type="submit" className="btn btn-light">
              Iniciar sesión
            </button>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;
