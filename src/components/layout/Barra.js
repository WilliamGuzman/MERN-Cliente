import React, { useContext, useEffect } from 'react';
//Se debe importar el context de autenticacion en todas las partes que se requiere usar la info del usuario
//Esto es como los if para validar la sesion en PHP
import AuthContext from '../../context/autenticacion/authContext';

const Barra = () => {

    //Extraer la informacion del context
    const authContext = useContext(AuthContext);
    const {  usuario, usuarioAutenticado, cerrarSesion } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        //pasar usuarioAutenticado no permite cerrar sesión para eliminar el warning colocamos la siguiente linea
        // eslint-disable-next-line
    }, []);


    return ( 

        <header className="app-header">
            { usuario 
                ? <p className="nombre-usuario">
                    Hola <span> {usuario.nombre} </span>
                </p>
                : null
            }

            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => cerrarSesion()}
                >
                    Cerrar Sesión
                </button>
            </nav>

        </header>

     );
}
 
export default Barra;