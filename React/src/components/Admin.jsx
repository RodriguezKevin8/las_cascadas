import Habitacion from '../images/habitacion.avif';
import '../css/Admin.css';
import { Link } from 'react-router-dom';

function Admin() {
    const elementosJSX = [];

    function Alerta(e){
        if(false){
            alert('La habitacion no se puede eliminar porque esta ocupada');
        }else{
            confirm('¿Desea eliminar la habitacion?');
        }
        
    }

  for (let i = 0; i < 9; i++) {
    elementosJSX.push(
      <div className='habitacion' key={i}>
            <img src={Habitacion} alt="" className='img__habitacion' />
            <div className='habitacion__contenido'>
                <h3 className='habitacion__titulo'>Habitacion {i + 1}</h3>
                <p className='habitacion__texto border_bottom'>
                    Lorem ipsum dolor sit amet consectetur
                    adipisicing elit.
                    Expedita assumenda ad voluptatibus similique.
                </p>             
            </div>
            <div className='Admin__botones'>
                <Link to={`/FmrEditar`}>
                    <a><i className="bi bi-pencil-square"></i></a> 
                </Link>               
                <a onClick={Alerta}><i className="bi bi-trash3-fill"></i></a>
              </div>              
      </div>
    ); 
  }

  return (
    <div className='flex mt-5'>
       <Link to={`/FmrAgregar`}>
        <button className='btn'>Agregar Habitacion</button>
       </Link>
    <div className='habitaciones'>
      {elementosJSX}
    </div>
    
  </div>
  )
}

export default Admin