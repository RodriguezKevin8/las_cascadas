import React from 'react'
import '../css/Reservacion.css';

export default function Reservacion() {
  return (
    <div>  
        <h1 className='h1'>Reservacion</h1>
        <div className='Reservacion container'>
            <form className='Rform'>
                <div className='Rform__campo'> 
                    <label htmlFor="fecha" className='Rform__label'>Fecha</label>
                    <input type="date" className='Rform__select'/>
                </div>
                <div className='Rform__campo'> 
                    <label htmlFor="fecha" className='Rform__label'>Tipo de Habitacion</label>
                    <select name="" id="fecha" className='Rform__select select'>
                        <option value="1">1</option>
                    </select>
                </div>
                <div className='Rform__campo Rbtn'> 
                   <input className='Reserv_btn-Buscar' type="button" value={'Buscar'} />
                </div>
            </form>
        </div>
    </div>
  )
}
