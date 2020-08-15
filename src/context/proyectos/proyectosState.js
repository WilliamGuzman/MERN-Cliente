import React, { useReducer } from 'react';
import  proyectoContext  from './proyectoContext';//Importamos el context para poder acceder a los datos en todos los componentes sin necesidad de asignarlos
import proyectosReducer from './proyectosReducer';
import { 
        FORMULARIO_PROYECTO, 
        OBTENER_PROYECTOS,
        AGREGAR_PROYECTO,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO,
        PROYECTO_ERROR
} from '../../types';//En este caso no se pone el nombre del archivo ya que se llama index
import clienteAxios from '../../config/axios';




//Este State se encargara de todas las acciones de toda la app
const ProyectoState  = props => {

    

    //En esta parte estan todos los datos o estados que se requieran que fluyan en toda la app
    const initialState = {

        proyectos : [],
        formulario: false, //Mostrara o no el input y boton de agregar proyecto
        errorformulario: false,
        proyecto: null,
        formulariotarea: false,
        mensaje: null
    }

    // Dispatch para ejecutar las acciones
    // Dispatch se encargara de ejecutar los diferentes type que se encuentran en proyectosReducer con el fin de cambiar los state necesarios
    const [ state, dispatch ] = useReducer(proyectosReducer,initialState);

    //*************** Serie de funciones para el CRUD *******************//
    // Cada funcion se le tiene que agregar el dispatch para saber que context va a trabajar y de igual forma esta funcion se tiene que agregar en el index.js de la carpeta types
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //Obtener los proyectos
    const obtenerProyectos = async () => {
        try {

            const resultado = await clienteAxios.get('/api/proyectos');
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data //Lo que tome la funcion va hacer el payload en este caso proyectos, estos datos pasan al reducer y se utilizan usando action.payload despues del ...state
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    //Agregar nuevo proyecto
    const agregarProyecto = async proyecto => {
        
        try {

            const resultado = await clienteAxios.post('/api/proyectos', proyecto);

            //Insertar el proyecto en el state
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            })    
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
        
    }

    //Valida formulario
    const mostrarError = () =>{
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    //Selecciona el proyecto que el usuario dio click
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    //Eliminar proyecto
    const eliminarProyecto = async proyectoId => {
        
        try {
            
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })

        } catch (error) {
            
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    return (

        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,//state
                formulario: state.formulario,//state
                errorformulario: state.errorformulario, //State
                proyecto: state.proyecto, //State,
                formulariotarea: state.formulariotarea, //State
                mensaje: state.mensaje, //State
                mostrarFormulario, //Funcion
                obtenerProyectos, //Funcion
                agregarProyecto, //Funcion
                mostrarError, //Funcion
                proyectoActual, //Funcion
                eliminarProyecto //Funcion
            }}
        >
            { props.children }
        </proyectoContext.Provider>

    );

}

export default ProyectoState;