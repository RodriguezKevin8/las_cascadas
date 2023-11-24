import React from "react";
import { MDBContainer, MDBCard, MDBCardBody, MDBInput } from "mdb-react-ui-kit";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import axios from "axios";

import logo from "../images/logito.png";

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
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <MDBCard
          className="w-100 mx-2 mx-sm-5 mx-md-5 mx-lg-5 mx-xl-5 p-4 p-sm-5 p-md-5 p-lg-5 p-xl-5 shadow-5"
          style={{
            background: "hsla(0, 0%, 100%, 0.8)",
            backdropFilter: "blur(30px)",
          }}
        >
          <MDBCardBody className="p-3 p-sm-5 p-md-5 p-lg-5 p-xl-5 text-center">
            <img src={logo} className="mt-2 mb-5" alt="" />
            <h2 className="fw-bold mb-4 mb-sm-5 mb-md-5 mb-lg-5 mb-xl-5 colora">
              Administrador
            </h2>
            <form onSubmit={handleSubmit}>
              <MDBInput
                wrapperClass="mb-4 mb-sm-5 mb-md-5 mb-lg-5 mb-xl-5"
                label="Email"
                id="email"
                name="correo"
                placeholder="Correo electronico"
                value={data.correo}
                onChange={handleChange}
              />
              <MDBInput
                wrapperClass="mb-4 mb-sm-5 mb-md-5 mb-lg-5 mb-xl-5"
                label="Password"
                id="password"
                type="password"
                placeholder="Contraseña"
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
      </div>
    </MDBContainer>
  );
}

export default Login;
