import React, { Fragment, useContext, useState } from 'react';

//Importamos el context 
import ProyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    //OBtener el state del formuario de agregar proyecto
    const proyectoContext = useContext(ProyectoContext);

    const { formulario, errorformulario ,mostrarFormulario, agregarProyecto, mostrarError } = proyectoContext;//Pasamos el valor del state de formulario a la variable formulario

    //State Local
    const [ proyecto, guardarProyecto ] = useState({
        nombre: ''
    });

    //Extraer nombre del proyecto
    const { nombre } = proyecto;

    //Lee el contenido del input
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    //Funcion para mostrar el formulario de nuevo proyecto
    const onClickFormulario = () => {
        mostrarFormulario();
    }

    //Cuando el usuario envia un proyecto
    const onSubmitProyecto = e => {
        e.preventDefault();

        //Validar Proyecto
        if (nombre === '') {
            mostrarError();
            return;
        }

        //Agregar al state
        agregarProyecto(proyecto);

        //Reiniciar formulario
        guardarProyecto({
            nombre: ''
        });
    }

    return ( 

        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={onClickFormulario}
            >
                Nuevo Proyecto
            </button>

            { formulario
                ?
                    (
                        <form
                            className="formulario-nuevo-proyecto"
                            onSubmit={onSubmitProyecto}
                        >

                            <input 
                                type="text"
                                className="input-text"
                                placeholder="Nombre Proyecto"
                                name="nombre"
                                onChange={onChangeProyecto}
                            />

                            <input 
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Agregar Proyecto"
                            />
                        </form>
                    )
                : null
            }

            { errorformulario ? <p className="mensaje error">EL nombre del proyecto es obligatorio</p> : null}

        </Fragment>

     );
}
 
export default NuevoProyecto;