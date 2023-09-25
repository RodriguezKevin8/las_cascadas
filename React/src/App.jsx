import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Reservacion from "./components/Reservacion";
import ResHabitaciones from "./components/ResHabitaciones";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="fondo">
        <div className="opacidad">
          <Navbar />
         <div className="titulo">
         <Routes>
             <Route path="/home" element={<h1>Las cascadas</h1>}/>
             <Route path="/about" element={<h1>Sobre Nosotros</h1>}/>
             <Route path="/contact" element={<h1>Contactanos</h1>}/>
             <Route path="/Reservacion" element={<Reservacion/>}/> 
          </Routes>
         </div>
        </div>
      </div>
     <div className="container">
     <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/Reservacion" element={<ResHabitaciones/>}/>
      </Routes>
     </div>
    </BrowserRouter>
  );
}

export default App
