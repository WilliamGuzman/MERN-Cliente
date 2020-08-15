import clienteAxios from './axios';

const tokenAuth = token => {
    if (token) {
        //Pasamos al Header el token
        clienteAxios.defaults.headers.common['x-auth-token'] = token;
    }else {
        //Si se cerro sesion o expori el token see elimina
        delete clienteAxios.defaults.headers.common['x-auth-token'];
    }
}

export default tokenAuth;