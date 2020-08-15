import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormTarea from '../tareas/FormTarea';
import ListadoTareas from '../tareas/ListadoTareas';

//Se debe importar el context de autenticacion en todas las partes que se requiere usar la info del usuario
//Esto es como los if para validar la sesion en PHP
import AuthContext from '../../context/autenticacion/authContext';

const Proyectos = () => {

    //Extraer la informacion del context
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);

    return ( 
        <div className="contenedor-app">
            
            <Sidebar />

            <div className="seccion-principal">

                <Barra />

                <main>

                    <FormTarea />

                    <div className="contenedor-tareas">
                        <ListadoTareas />    
                    </div>

                </main>
            </div>

        </div>
     );

}
 
export default Proyectos;