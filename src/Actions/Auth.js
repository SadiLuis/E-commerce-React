import axios from 'axios';
import {
    AUTHENTICATION_ERROR, 
    GET_PEDIDO_BY_USER, 
    GET_USER_DETAIL, 
    LOGIN_FAILED, 
    LOGIN_SUCCESS, 
    LOGOUT, 
    REGISTER_FAILED, 
    REGISTER_SUCCESS, 
    UPDATE_USER, 
    RECOVERY_PASSWORD
} from './Index';

import {BASEURL} from '../Assets/URLS';

import getHeaderToken from '../Helpers/getHeaderToken';



export const getUserDetail = () => {
   return async (dispatch) => {
      const headers = getHeaderToken();
       console.log('linea 24');
      try {
         const { data } = await axios.get(`${BASEURL}/user`, headers);
         //toast(`Bienvenido ${data.nombre}`)
          console.log(data);
         dispatch({
            type: GET_USER_DETAIL,
            payload: data
         })
        // dispatch(getPedidosByUser(data.id));
      } catch (error) {
         console.log(error.response.data);
         dispatch({
            type: AUTHENTICATION_ERROR
         })
      }
   }
}
 

export function register({
    nombre,
    usuario,
    contrasena,
    email,
    pais,
    provincia,
    direccion,
    telefono }) {
    return async function (dispatch) {
       try {
          // Configuro los headers
          const config = {
             headers: {
                'Content-Type': 'application/json',
             },
          };
 
          // Armo el payload/body
          const body = {
             nombre,
             usuario,
             contrasena,
             email,
             pais,
             provincia,
             direccion,
             telefono
          };
          console.log("body")
          console.log(body)
          let { data } = await axios.post(`${BASEURL}/user/register`, body, config);
 
          // console.log(data);
          dispatch({
             type: REGISTER_SUCCESS,
             payload: data
          })
          dispatch(getUserDetail());
         } catch (error) {
            console.log(error);
            dispatch({
                type: REGISTER_FAILED,
                payload: error.response.data
            })
            }
    }
}


export function login({ email, contrasena }) {
   return async (dispatch) => {
      try {
         // Configuro los headers
         const config = {
            headers: {
               'Content-Type': 'application/json',
            },
         };
         // Armo el payload/body
         const body = { email, contrasena };

         // Envío la petición con el body y config armados
         let { data } = await axios.post(`${BASEURL}/user/login`, body, config);

         // Si todo bien configuro al usuario como logueado
         dispatch({
            type: LOGIN_SUCCESS,
            payload: data
         });

         dispatch(getUserDetail());
      } catch (err) {
         
         console.log(err.response.data);

         // Si ocurrió un error durante el logen, envio el login_fail
         return dispatch({
            type: LOGIN_FAILED
         });
      }
   }
};
export function logout() {
    return { type: LOGOUT }
 }



 export function updateUser(newUser) {
   return async function (dispatch) {
      try {
         await axios.put(
            `${BASEURL}/user/update`,
            newUser,
            getHeaderToken()
         )
         dispatch(getUserDetail());
         return {
            type: UPDATE_USER,
         };
      } catch (err) {
         console.log(err.response.data)
      }
   }
}

 

export function recoveryPassword  (email) {
    let post =  axios.post(`${BASEURL}/password`, 
    {"email": `${email}`},
    {
        'content-Type': 'application/json',
    })
    console.log(post);
}