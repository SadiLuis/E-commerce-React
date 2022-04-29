import { ADD_ITEM, DELETE_CART, DELETE_CART_DB, DELETE_ITEM, GET_CART, REST_ITEM, UPDATE_CART } from "./Index"
import { BASEURL } from '../Assets/URLS';
import getHeaderToken from '../Helpers/getHeaderToken';
import axios from 'axios'
export const addItem = (id) => {
   return {
      type: ADD_ITEM,
      payload: id
   }
}

export const deleteItem = (id) => {
   return {
      type: DELETE_ITEM,
      payload: id
   }
}

export const restItem = (id) => {
   return {
      type: REST_ITEM,
      payload: id
   }
}

export function updateCart() {
   return { type: UPDATE_CART }
}

export const getCartDB = (userId) => async dispatch => {
   try {
      let config = getHeaderToken();
      const { data } = await axios.get(
         `${BASEURL}/carritos/${userId}`,
         config
      );
      return dispatch({ type: GET_CART, payload: data });
   } catch (err) {
     
      return console.log(err.response.data);
   }
}

export const createCartDb = async () => {
   await axios.post(`${BASEURL}/carritos`,
      {},
      getHeaderToken())
}

export const addItemCart = async (cart, id) => {
   await axios.put(`${BASEURL}/carritos/add`,
      {
         carritoId: id,
         productoId: cart.id,
         cantidad: cart.quantity
      }, getHeaderToken())
}

export const deleteProductCart = async (product, id) => {
   await axios.put(`${BASEURL}/carritos/delete`,
      {
         carritoId: id,
         productoId: product
      }, getHeaderToken())
}

export const deleteAllCartDB = id => async dispatch => {
   try {
      const res = await axios.delete(`${BASEURL}/carritos/${id}`, getHeaderToken())
      const data = res.data
      return dispatch({ type: DELETE_CART_DB, payload: data })
   } catch (err) {
      return console.log(err.response.data);
   }
}

export const deleteAllCart = () => {
   return {
      type: DELETE_CART
   }
}