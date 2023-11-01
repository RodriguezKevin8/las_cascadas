import "../css/Verificar.css";
import habitacion from "../images/habitacion.jpg";

function Verificar() {
  function Verificando() {
    let existe = true;
    const contenedor = document.querySelector("#contenido");
    if (existe) {
      contenedor.innerHTML = `
            <div class='VerHabitacion'>
                <ul class='listaVerificacion'>
                    <li>
                        Numero: <span>1</span>
                    </li>
                    <li>
                        Tipo: <span>Individual</span>
                    </li>
                    <li>
                        Capacidad: <span>2</span>
                    </li>
                    <li>
                        Precio: <span>$20</span>
                    </li>
                </ul>
                <img src={${habitacion}} alt="habitacion" />
            </div>
            `;
    } else {
      contenedor.innerHTML = `
            <div class='textoError'>
                <h2>El codigo es incorrecto o no existe para una habitacion</h2>
            </div>`;
    }
  }
  return (
    <div className="contenedor">
      <label htmlFor="">Ingresar Codigo:</label>
      <div className="ingresar">
        <div>
          <input type="text" />
        </div>
        <a className="enviando" onClick={Verificando}>
          <p>Enviar</p>
        </a>
      </div>
      <div id="contenido"></div>
    </div>
  );
}

export default Verificar;
