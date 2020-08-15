import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';

//Funcion higherOrderComponent para proteger las rutas
//Esta forma es para enviar un componente dentro de otro
//Creamos una copia de los props para usarlos en los componentes hijos
const RutaPrivada = ({ component: Component, ...props}) => {

    const authContext = useContext(AuthContext);
    const { autenticado, cargando,usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, [])

    return(

        <Route 
            { ...props }
            render={ props => !autenticado && !cargando
                    ? ( <Redirect to="/" />)
                    : ( <Component {...props} />)
                }
        />

    );
}

export default RutaPrivada;