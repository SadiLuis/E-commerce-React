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
    RECOVERY_PASSWORD,
    LOGIN_GOOGLE_SUCCESS,
    LOGIN_GOOGLE_FAILED
} from './Index';

import {BASEURL} from '../Assets/URLS';
import Swal from 'sweetalert2'
import getHeaderToken from '../Helpers/getHeaderToken';
import {createCartDb } from './cart'
import { getChatNotifications, getNotifications } from './notifications';


export const getUserDetail = () => {
   return async (dispatch) => {
      const headers = getHeaderToken();
      // console.log(headers);
      try {
         const { data } = await axios.get(`${BASEURL}/user`, headers);
         //toast(`Bienvenido ${data.nombre}`)
         //console.log(data);
         
         dispatch({
            type: GET_USER_DETAIL,
            payload: data
         })
         //dispatch(getPedidosByUser(data.id));
        
         dispatch(getChatNotifications(data.id))
         dispatch(getNotifications(data.id))
      } catch (error) {
         //console.log(error.response.data);
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
    telefono,
    ciudad
    }) {
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
             telefono,
             ciudad
           
          };
          //console.log("body")
          //console.log(body)
          let { data } = await axios.post(`${BASEURL}/user/register`, body, config);
           
          // console.log(data);
          dispatch({
             type: REGISTER_SUCCESS,
             payload: true
          })

         
          
         } catch (error) {
            //console.log(error);

            Swal.fire({
               icon: 'error',
               title: 'Datos incorrectos',
               text: 'Algo salió mal , intentelo de nuevo ingresando los datos nuevamente!',
              
             })

            dispatch({
                type: REGISTER_FAILED,
                payload: false
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
         //console.log(data)
         dispatch(createCartDb())
         dispatch(getUserDetail());
      } catch (err) {
         //toast.error(err.response.data);
         //console.log(err.response.data);
         err.response.data==="Usuario bloqueado"
            ?Swal.fire({
               icon: 'error',
               title: 'Usuario dado de baja',
               text: 'Usted ha sido de baja, por cualquier consulta contactenos',
              
             })
            :Swal.fire({
               icon: 'error',
               title: 'Datos incorrectos',
               text: 'Algo salió mal , intentelo de nuevo ingresando los datos nuevamente!',
              
             })
         
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
 export function updateUserImg(body) {
   return async function (dispatch) {
      try {
         await axios.put(
            `${BASEURL}/user/updateImg`,
            body,
          /*   getHeaderToken() */
         )
         dispatch(getUserDetail());
         return {
            type: 'UPDATE_USER_IMG',
         };
      } catch (err) {
         console.log(err.response.data)
      }
   }
}


export function recoveryPassword  (email) {
   return async function (dispatch) {
      try{
        
      const body = {email}
      const res = await axios.post(`${BASEURL}/password`, body)
      dispatch({
         type: RECOVERY_PASSWORD,
         payload: res.data
      })
      Swal.fire({
         text: `Por favor revise su casilla de correo `,
         icon: "success",
         confirmButtonText: "Ok",
         title:'Se envío un enlace a su Email'
       });

   } catch (err) {
      Swal.fire({
         icon: 'error',
         title: 'Datos incorrectos',
         text: err.response.data.message,
        
       })
      dispatch({
         type: RECOVERY_PASSWORD,
         payload: err.response.data
         })
      }
   }
}

export function loginGoogle({ email, nombre ,avatar ,usuario }) {
   return async (dispatch) => {
      try {
         // Configuro los headers
         const config = {
            headers: {
               'Content-Type': 'application/json',
            },
         };
         // Armo el payload/body
         const body = { email, nombre , avatar , usuario};

         // Envío la petición con el body y config armados
         let { data } = await axios.post(`${BASEURL}/loginGoogle`, body, config);
         // Si todo bien configuro al usuario como logueado
         dispatch({
            type: LOGIN_GOOGLE_SUCCESS,
            payload: data
         });
   
         dispatch(getUserDetail());
         
         
        
      } catch (err) {
         //toast.error(err.response.data);
         console.log(err);
         Swal.fire({
            title: "Se produjo un error",
            text: "ocurrió un problema con la sesíon de Google",
            icon: "error",
          });
         // Si ocurrió un error durante el logen, envio el login_fail
         return dispatch({
            
            type: LOGIN_GOOGLE_FAILED
         });
      }
   }
};

export function resetRegister(){
 return {
    type:'RESET_REGISTER'
 }
}