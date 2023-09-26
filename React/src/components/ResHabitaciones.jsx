import React from 'react'
import Habitacion from '../images/habitacion.avif';
import '../css/Habitaciones.css';

export default function ResHabitaciones() {

    const elementosJSX = [];

    for (let i = 0; i < 9; i++) {
    elementosJSX.push(
      <div className='habitacion' key={i}>
        <img src={Habitacion} alt="" className='img__habitacion'/>
        <div className='habitacion__contenido'>
          <h3 className='habitacion__titulo'>Habitacion {i+1}</h3>
          <p className='habitacion__texto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Expedita assumenda ad voluptatibus similique, iusto exercitationem ut culpa. 
            Dignissimos minima beatae officia, 
            dolor similique consequuntur dicta ab velit quam reiciendis hic.
          </p>
          <div className='habitacion__botones'>
            <a className='boton btn__detalles'>Detalles</a>
            <a className='boton btn__reservar'>Reservar</a>
          </div>
        </div>
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
