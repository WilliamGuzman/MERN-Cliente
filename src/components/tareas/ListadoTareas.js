import React, { Fragment, useContext } from 'react';
import Tarea from '../tareas/Tarea';
import { CSSTransition, TransitionGroup } from 'react-transition-group'; //Paquete instalado con el comando npm i react-transition-group

//Importamos el context 
import ProyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const ListadoTareas = () => {

    //Extraer proyectos del StateInicial
    const proyectoContext = useContext(ProyectoContext);
    const { proyecto, eliminarProyecto } = proyectoContext;//Pasamos el valor del state de formulario a la variable formulario

    //Obtener las tareas del proyecto
    const tareasContext = useContext(tareaContext);
    const { tareasProyecto  } = tareasContext;

    //Si no hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un proyecto</h2>;

    //Array destructuring para extraer el proyecto actual
    const [ proyectoActual ] = proyecto; 


    //Elimina un proyecto
    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual._id);
    }

    return (  
        <Fragment>

            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                
                {tareasProyecto.length === 0
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    : <TransitionGroup>
                            {tareasProyecto.map(tarea => (
                                <CSSTransition
                                    key={tarea._id}
                                    timeout={200}
                                    classNames="tarea"
                                >
                                    <Tarea 
                                        tarea={tarea}
                                    />
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                
                }

            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >
                Eliminar Proyecto &times;
            </button>
            
        </Fragment>

    );
}
 
export default ListadoTareas;