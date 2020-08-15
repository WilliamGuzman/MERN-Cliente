import React, { useContext } from 'react';

//Importamos el context 
import ProyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({proyecto}) => {

    //Obtener el state de proyectos
    const proyectoContext = useContext(ProyectoContext);
    const { proyectoActual } = proyectoContext;//Pasamos el valor del state de formulario a la variable formulario

    //Obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const { obtenerTareas  } = tareasContext;

    //Funcion para agregar el proyecto actual
    const seleccionarProyecto = id =>{
        proyectoActual(id); //Fijar proyecto actual
        obtenerTareas(id); //Filtrar las tareas cuando se da click
    }

    return (

        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={ () => seleccionarProyecto(proyecto._id) }
            >
                {proyecto.nombre}
            </button>

        </li>

     );
}
 
export default Proyecto;