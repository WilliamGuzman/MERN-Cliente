import React, { useContext, useEffect } from 'react'
import Proyecto from './Proyecto';
import { CSSTransition, TransitionGroup } from '../../../node_modules/react-transition-group'; //Paquete instalado con el comando npm i react-transition-group

//Importamos el context 
import ProyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';

const ListoProyectos = () => {

    
    //Extraer proyectos del StateInicial
    const proyectoContext = useContext(ProyectoContext);
    const alertaContext = useContext(AlertaContext);

    const { proyectos, mensaje, obtenerProyectos } = proyectoContext;//Pasamos el valor del state de formulario a la variable formulario
    const { alerta, mostrarAlerta } = alertaContext;

    //Obtener proyectos cuando cargue el componente
    useEffect(() => {

        //Si hay un error
        if (mensaje) { 
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerProyectos();
        // eslint-disable-next-line
    }, [mensaje])

    //Revisar si proyecto tiene contenido
    if(proyectos.length === 0) return <p>No tienen ningun proyecto</p>;

    return (  

        <ul className="listado-proyectos">

            {alerta 
                ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>)
                : null
            }

            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto._id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto 
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>

        </ul>

    );
}
 
export default ListoProyectos;