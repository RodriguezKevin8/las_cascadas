import React from 'react'
import Habitacion from '../images/habitacion.avif';
import '../css/Habitaciones.css';
import { Link } from 'react-router-dom';

export default function ResHabitaciones() {
  const elementosJSX = [];

  for (let i = 0; i < 9; i++) {
    elementosJSX.push(
      <div className='habitacion' key={i}>
        <div className='cara adelante'>
            <img src={Habitacion} alt="" className='img__habitacion' />
            <div className='habitacion__contenido'>
              <h3 className='habitacion__titulo'>Habitacion {i + 1}</h3>
              <p className='habitacion__texto'>Lorem ipsum dolor sit amet consectetur
               adipisicing elit.
                Expedita assumenda ad voluptatibus similique.
              </p>
              <div className='habitacion__botones'>
                <p>Mostrar Detalles</p>
              </div>
            </div>
        </div>            
        {/* FIN ADELANTE */}
        <div className="atras">
          <h3>Detalle</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            Porro, officia id! Incidunt possimus quod amet, ea eum explicabo 
            itaque assumenda perferendis fuga reiciendis minus earum a sint dolor 
            voluptates error.
          </p>
          <Link to={'/reservarContenedor'}>
            <button className='boton btn__reservar'>Reservar</button>
          </Link>
        </div>
        {/* FIN ATRAS */}
      </div>
    ); 
  }

  return (
    <div className='flex'>
      <div className='habitaciones'>
        {elementosJSX}
      </div>
      
    </div>
  )
 
   
};
