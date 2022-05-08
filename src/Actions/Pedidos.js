import axios from 'axios';
import { BASEURL } from '../Assets/URLS';
import getHeaderToken from '../Helpers/getHeaderToken';

export const getPedidosByUser = (userId) => async dispatch => {
    try {
       let config = getHeaderToken();
       const { data } = await axios.get(
          `${BASEURL}/pedidos/user/${userId}`,
          config
       );
       const order = data

       dispatch(getDetailPedido(data));

       return dispatch({ type: "GET_PEDIDOS_BY_USER", payload: data });
    } catch (err) {
       return console.log(err.response.data);
    }
 }


export function getPedidosById (userId) {
    return async function (dispatch){
        try{
            let config = getHeaderToken();
            const {data} = await axios.get(`${BASEURL}/pedidos/user/${userId}`, config
                )

         
        return dispatch({
            type: 'GET_ORDERS_ID',
            payload: data
        })
        }catch(err){
            console.log(err.response.data)
        }
        
    }
}
export const getDetailPedido = (pedido) => {
    return { type: 'GET_PEDIDO_DETAIL', payload: pedido };
 }
 
 export const postPedido = (pedido) => {
    return async function (dispatch) {
       try {
          const { data } = await axios.post(
             `${BASEURL}/pedidos`,
             pedido,
             getHeaderToken()
          );
          // console.log(data);
          return dispatch(getDetailPedido(data));
       } catch (err) {
          console.log(err);
       }
    }
 }

 export function changeStatus(id, newStatus) {

   const body = { 
      idPedido: id,
      status: newStatus
   }
   return async function (dispatch) {
      try {
         //const config = getHeaderToken()
         const response = await axios.put(`${BASEURL}/pedidos/update`, body)
         return dispatch({
            type: 'EDIT_STATUS',
            payload: response.data
         })
      } catch (err) {
         return console.log(err.response.data);
      }
   }
}

export function editStatusPedido(orderId, newStatus) {
   
   return async function (dispatch) {
      
      try {
         const body = {
            status : newStatus
         }
         const config = getHeaderToken()
         const response = await axios.put(`${BASEURL}/pedidos/${orderId}`, body, config)
         return dispatch({
            type: 'EDIT_STATUS_ORDER',
            payload: response.data
         })
      } catch (err) {
         return console.log(err.response.data);
      }
   }
}