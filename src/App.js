import React from 'react';
//Importamos lo necesario para utiliza turas en el proyecto
//Deben de ser instaladas previamente con el comando npm i react-router-dom
//Para utilizarlos se colocan como componentes
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';

//Importamos el context
import ProyectoState from './context/proyectos/proyectosState';//Context de proyectos
import TareaState from './context/tareas/tareaState';//Context de tareas
import AlertaState from './context/alertas/alertaState';//Context de Alertas
import AuthState from './context/autenticacion/authState';//Context de Alertas
import RutaPrivada from './components/rutas/rutaPrivada';// higherOrderComponent

//Importamos el token
import tokenAuth from './config/token';

//Revisar si tenemos un token
const token = localStorage.getItem('token');
if (token) {
  tokenAuth(token);
}

function App() {

  console.log(process.env.REACT_APP_BACKEND_URL);

  return (
    
    <ProyectoState>
      
      <TareaState>

        <AlertaState>

          <AuthState>

            <Router>

              <Switch>

                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component={Proyectos} />
                
              </Switch>

            </Router>

            </AuthState>

        </AlertaState>
        
      </TareaState>

    </ProyectoState>
  );
}

export default App;
