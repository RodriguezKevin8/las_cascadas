import "../css/Contact.css";

function Comentario() {
  return (
    <div className="contacto">
      <h2 className="titulo__contactanos">Envianos un mensaje!</h2>
      <div className="contacto-bg">
        <div className="opacidad-contactos"></div>
      </div>
      <form className="formulario">
        <div className="formulario__campo">
          <label className="formulario__label" htmlFor="nombre">
            Nombre
          </label>
          <input className="input" type="text" id="nombre" />
        </div>
        <div className="formulario__campo">
          <label className="formulario__label" htmlFor="numero">
            Numero
          </label>
          <input className="input" type="tel" id="numero" />
        </div>
        <div className="formulario__campo">
          <label className="formulario__label" htmlFor="email">
            E-mail
          </label>
          <input className="input" type="email" id="email" />
        </div>
        <div className="formulario__campo">
          <label className="formulario__label" htmlFor="mensaje">
            Mensaje
          </label>
          <textarea className="input" id="mensaje"></textarea>
        </div>
        <div className="formulario__campo  ">
          <input type="submit" value={"Enviar"} className="boton enviar" />
          <button className="boton regresar">Regresar</button>
        </div>
      </form>
    </div>
  );
}

export default Comentario;
