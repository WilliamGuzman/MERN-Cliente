import { 
        FORMULARIO_PROYECTO, 
        OBTENER_PROYECTOS ,
        AGREGAR_PROYECTO,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO,
        PROYECTO_ERROR
} from '../../types';

export default (state, action) => {
    
    //SIEMPRE en cada case del switch se hara una copia del STATE SIEMPRE!!!
    switch(action.type){
        
        case FORMULARIO_PROYECTO:
            return{
                ...state,
                formulario: true
            } 
        case OBTENER_PROYECTOS:
            return {
                ...state,
                proyectos: action.payload //El payload que se pasa desde el archivo del State Inicial de la aplicacion seran los datos a los que se les hara referencia en esta parte
            }
        
        case AGREGAR_PROYECTO:
            return{
                ...state,
                proyectos: [ action.payload, ...state.proyectos ], //Esto se hace con el fin de mantener el listado de todos los proyectos agregados 
                formulario: false, //Pasamos el formulario a false para que una vez se ingrese el proyecto este se oculte
                errorformulario: false //Una vez agregado el nuevo proyecto pasamos el error a false para que se quite el error del campo vacio
            }

        case VALIDAR_FORMULARIO:
            return{
                ...state,
                errorformulario: true
            }

        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyecto: state.proyectos.filter( proyecto => proyecto._id === action.payload )//Compara el proyecto seleccionado con todos los que estan en el arreglo
            }

        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter( proyecto => proyecto._id !== action.payload ),//Compara el proyecto seleccionado con todos los que estan en el arreglo
                proyecto: null
            }
        
        case PROYECTO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }

        default:
            return state;
    }
}