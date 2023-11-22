import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import logoImage from "../images/logito.svg";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin749293");
    window.location.reload();
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarClasses = `navbar navbar-expand-lg navbar-custom ${
    isScrolled ? "navbar-fixed" : ""
  }`;

  return (
    <div>
      <nav className={navbarClasses}>
        <div className="container">
          <Link className="navbar-brand" to={`/home`}>
            <img src={logoImage} alt="Logo" style={{ width: "100px" }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item ml-auto">
                <Link className="nav-link" aria-current="page" to={`/home`}>
                  Inicio
                </Link>
              </li>
              <li className="nav-item ml-auto">
                <Link className="nav-link" to={`/about`}>
                  Sobre nosotros
                </Link>
              </li>
              <li className="nav-item ml-auto">
                <Link className="nav-link" to={`/contact`}>
                  Contactanos
                </Link>
              </li>
              <li className="nav-item ml-auto">
                <Link className="nav-link" to={`/Reservacion`}>
                  Reservaciones
                </Link>
              </li>
              <li className="nav-item ml-auto">
                <Link className="nav-link" to={`/Verificar`}>
                  Verificar Reserva
                </Link>
              </li>
              {token && (
                <>
                  <li className="nav-item ml-auto">
                    <Link className="nav-link" to={`/administrar`}>
                      Admin
                    </Link>
                  </li>
                  <li className="nav-item ml-auto">
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Navbar;
