import React from 'react'
import Habitacion from '../images/habitacion.avif';
import '../css/fmrRservacion.css';
import { Link } from 'react-router-dom';

function fmrReservacion() {
  return (
    <div>
        <div className='detalles'>
            <img src={Habitacion} alt="" className='img__habitacion' />
            <div className='detalles__info'>
                <div className='info__detalle'>
                    <span>precio:</span>
                    <p>$20</p> 
                </div>
                <div className='info__detalle'>
                    <span>Numero Habitacion:</span>
                    <p>6</p>
                </div>
                <div className='info__detalle'>
                    <span>Tipo:</span>
                    <p>Individual</p>
                </div>
                <div className='info__detalle'>
                    <span>Capacidad:</span>
                    <p>1</p>
                </div>
            </div>
        </div>
        {/* Cierre detalles */}

        <form className='frmReservacion'>
          <div className='frmReservacion__campo'>
            <label className='frmReservacion__label' htmlFor="nombre">Nombre</label>
            <input className='frm__input' type="text" id='nombre'/>
          </div>
          <div className='frmReservacion__campo'>
            <label className='frmReservacion__label' htmlFor="numero"  >Numero</label>
            <input className='frm__input' type="tel" id='numero'/>
          </div>
          <div className='frmReservacion__campo'>
            <label className='frmReservacion__label' htmlFor="email">E-mail</label>
            <input className='frm__input' type="email" id='email'/>
          </div>
          <div className='especificaciones'>
            <div className='espc__detalle'>
                <span>TSub Total:</span>
                <p>$20</p>
            </div>
            <div className='espc__detalle'>
                <span>Cargo Por Servicio:</span>
                <p>$2</p>
            </div>
            <div className='espc__detalle'>
                <span>TSub Total:</span>
                <p>$22</p>
            </div>
      </div>
         <div className='frmReservacion__campo  '>
            <input type="submit" value={'Reservar'} className='boton enviar'/>
            <Link to={'/'}>
                 <button className='boton regresar'>Cancelar</button>
            </Link>
         </div>
      </form>
    </div>
  )
}

export default fmrReservacion