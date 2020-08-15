import React, { useContext } from 'react';

//Importamos el context 
import ProyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Tarea = ({tarea}) => {

    //Extraer si un proyecto esta activo
    const proyectoContext = useContext(ProyectoContext);
    const { proyecto } = proyectoContext;//Pasamos el valor del state de formulario a la variable formulario

    //Extraer las tareas por proyecto seleccionado
    const tareasContext = useContext(tareaContext);
    const {  obtenerTareas , eliminarTarea, actualizarTarea, guardarTareaActual  } = tareasContext;

    //Array destructuring para extraer el proyecto actual
    const [ proyectoActual ] = proyecto;

    //Funcion que se ejecuta cuando el usuario presiona el btn eliminar tarea
    const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual._id);
        //Otener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual._id);
    }

    //Funcion que modifica el estado de las tareas
    const cambiarEstado = tarea =>{

    
        if (tarea.estado) {

            tarea.estado = false;

        }else{

            tarea.estado = true;

        }

        actualizarTarea(tarea);
        
    }

    //Editar Tarea
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return ( 
        <li className="tarea sombra">

            <p>{ tarea.nombre }</p>

            <div className="estado">
                {tarea.estado
                    ?  (
                            <button 
                                type="button"
                                className="completo"
                                onClick={ () => cambiarEstado(tarea)}
                            >
                                    Completo
                            </button>
                        )
                    :
                        (
                            <button 
                                type="button"
                                className="incompleto"
                                onClick={ () => cambiarEstado(tarea)}
                            >
                                    Incompleto
                            </button>
                        )
                }
            </div>

            <div className="acciones">
                
                <button 
                    type="button"
                    className="btn btn-primario"
                    onClick={ () => seleccionarTarea(tarea)}
                >
                    Editar
                </button>

                <button 
                    type="button"
                    className="btn btn-secundario"
                    onClick={ () => tareaEliminar(tarea._id) }
                >
                    Eliminar
                </button>

            </div>

        </li>
     );
}
 
export default Tarea;