import React, { useReducer } from 'react';
import  alertaContext  from './alertaContext';//Importamos el context para poder acceder a los datos en todos los componentes sin necesidad de asignarlos
import  alertaReducer from './alertaReducer';
import { 
        MOSTRAR_ALERTA,
        OCULTAR_ALERTA
} from '../../types';//En este caso no se pone el nombre del archivo ya que se llama index


const AlertaState = props => {

    const initialState = {
        alerta: null
    }

    const [ state, dispatch ] = useReducer(alertaReducer, initialState);

    //Funciones

    //Mostrar Alerta
    const mostrarAlerta = ( msg, categoria ) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        });

        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 5000);
    }

    return (

        <alertaContext.Provider
            value= {{
                //State
                alerta: state.alerta,
                //Funciones
                mostrarAlerta
            }}
        >
            {props.children}

        </alertaContext.Provider>
    );
}

export default AlertaState;