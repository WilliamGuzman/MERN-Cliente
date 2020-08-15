import React, { useReducer } from 'react';

//Importamos el tareaContext
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import clienteAxios from '../../config/axios';

//Importamos los types
import { 
        TAREAS_PROYECTO,
        AGREGAR_TAREA,
        VALIDAR_TAREA,
        ELIMINAR_TAREA,
        TAREA_ACTUAL,
        ACTUALIZAR_TAREA,
        LIMPIAR_TAREA
} from '../../types';

//Creamos el state que manejara todas las tareas (agregar,eeditar,eliminar,etc)
const TareaState = props =>{

        const initialState = {

            tareasProyecto: [],

            errortarea: false,

            tareaseleccionada: null
        }

        //Crear State y Dispatch
        const [ state, dispatch ] = useReducer(TareaReducer, initialState);

        //FUNCIONES

        //Obtener las tareas de un proyecto
        const obtenerTareas = async proyecto => {

            try {
                const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto } });
                dispatch({
                    type : TAREAS_PROYECTO,
                    payload: resultado.data.tareas
                    
                })
            } catch (error) {
                console.log(error);
            }
        }

        //Agregar una tarea al proyecto seleccionado
        const agregarTarea = async tarea => {

            try {

                const resultado = await clienteAxios.post('/api/tareas', tarea);
                dispatch({
                    type: AGREGAR_TAREA,
                    payload: resultado.data.tarea
                })
            } catch (error) {
                console.log(error);
            }
            
        }   

        //Valida y muestra un error
        const validaTarea = () => {
            dispatch({
                type: VALIDAR_TAREA
            })
        }

        //Eliminar Tarea
        const eliminarTarea = async (id , proyecto) => {
            
            try {

                await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });

                dispatch({
                    type: ELIMINAR_TAREA,
                    payload: id
                })
            } catch (error) {
                console.log(error)
            }
        }

        //Actualizar tarea actual
        const actualizarTarea = async tarea => {
            
            try {
                const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
                
                dispatch({
                    type: ACTUALIZAR_TAREA,
                    payload: resultado.data.tarea
                })
            } catch (error) {
                console.log(error);
            }
        }

        //Extrae una tarea para edicion
        const guardarTareaActual = tarea => {
            dispatch({
                type: TAREA_ACTUAL,
                payload: tarea
            })
        }


        //Limpia la tarea despues de editarla
        const limpiarTarea = () => {
            dispatch({
                type: LIMPIAR_TAREA
            })
        }

        return (

            <TareaContext.Provider
                value={{
                    //State
                    tareasProyecto: state.tareasProyecto,
                    errortarea: state.errortarea,
                    tareaseleccionada: state.tareaseleccionada,
                    //Funciones
                    obtenerTareas,
                    agregarTarea,
                    validaTarea,
                    eliminarTarea,
                    guardarTareaActual,
                    actualizarTarea,
                    limpiarTarea
                }}
            >
                {props.children}
            </TareaContext.Provider>

        );

}

export default TareaState;