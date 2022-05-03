import axios from 'axios';
//import { toast } from 'react-toastify';
import { BASEURL } from '../Assets/URLS';
import getHeaderToken from '../Helpers/getHeaderToken';

export const getDetailOrder = (order) => {
   return { type: 'GET_ORDER_DETAIL', payload: order};
}

export const postOrder = (order) => {
   return async function (dispatch) {
      try {
         const { data } = await axios.post(
            `${BASEURL}/pedidos`,
            order,
            getHeaderToken()
         );
         // console.log(data);
         return dispatch(getDetailOrder(data));
      } catch (err) {
         console.log(err.response.data);
      }
   }
}

export const deleteOrder = (orderId) => {
   return async function (dispatch) {
      try {
         await axios.delete(
            `${BASEURL}/pedidos/${orderId}`,
            getHeaderToken()
         );
         //toast.success("Pedido eliminado exitosamente");
         return dispatch(getDetailOrder(null));
      } catch (err) {
         //toast.error("No se ha podido eliminar el pedido");
         console.log(err.response.data);
      }
   }
}

export const getAllOrders = () => {
   return async function (dispatch) {
      try {
         const { data } = await axios.get(
            `${BASEURL}/pedidos`,
            getHeaderToken()
         );
         return dispatch({ type: 'GET_ORDERS', payload: data });
      } catch (err) {
         console.log(err);
      }
   }
}

export const getOrdersByUser = (userId) => async dispatch => {
   try {
      let config = getHeaderToken();
      const { data } = await axios.get(
         `${BASEURL}/pedidos/user/${userId}`,
         config
      );
      return dispatch({ type: 'GET_ORDER_BY_USER', payload: data });
   } catch (err) {
      //toast.error("No se han podido cargar los pedidos");
      return console.log(err.response.data);
   }
}

export function editStatusOrder(orderId, newStatus) {
   return async function (dispatch) {
      try {
         const config = getHeaderToken()
         const response = await axios.put(`${BASEURL}/pedidos/${orderId}`, newStatus, config)
         return {
            type: 'EDIT_STATUS_ORDER',
            payload: response.data
         }
      } catch (err) {
         return console.log(err.response.data);
      }
   }
}