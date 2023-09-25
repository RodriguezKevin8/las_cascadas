import { Link, Outlet } from "react-router-dom";
import "../css/Navbar.css"
import logoImage from "../images/logo.png"; 

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-custom navbar-expand-lg mb-5">
        <div className="container flex">
          <div className="d-flex align-items-center">
            <Link className="navbar-brand" to={`/home`}>
              <img src={logoImage} alt="Logo"/> 
            </Link>
          </div>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to={`/home`}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/about`}>
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/contact`}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Navbar;
