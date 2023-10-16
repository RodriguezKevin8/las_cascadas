import React from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import "../css/login.css"

function Login() {
    return (
        <MDBContainer fluid>
        <div className=" p-2 p-sm-5 p-md-5 p-lg-5 p-xl-5" style={{ height: '100px' }}></div>
            <div className='centrado'>
                <MDBCard className=' justo mx-2 mx-sm-5 mx-md-5 mx-lg-5 mx-xl-5 mb-4 mb-sm-5 mb-md-5 mb-lg-5 mb-xl-5 p-4 p-sm-5 p-md-5 p-lg-5 p-xl-5 shadow-5' style={{ background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)' }}>
                    <MDBCardBody className='p-4 p-sm-5 p-md-5 p-lg-5 p-xl-5 text-center'>
                        <h2 className="fw-bold mb-4 mb-sm-5 mb-md-5 mb-lg-5 mb-xl-5 colora">Administrador</h2>
                        <MDBInput wrapperClass='mb-4 mb-sm-5 mb-md-5 mb-lg-5 mb-xl-5' label='Email' id='form1' type='email' placeholder='Correo@correo.com'/>
                        <MDBInput wrapperClass='mb-4 mb-sm-5 mb-md-5 mb-lg-5 mb-xl-5' label='Password' id='form2' type='password' placeholder='Contraseña'/>
                        <Link to={`/Administrar`}>
                            <button type="button" className="btn btn-light">Iniciar sesión</button>
                        </Link>
                    </MDBCardBody>
                </MDBCard>
            </div>
        </MDBContainer>
    );
}

export default Login;
