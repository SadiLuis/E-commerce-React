import { ADD_ITEM, DELETE_CART, DELETE_CART_DB, DELETE_ITEM, GET_CART, REST_ITEM, UPDATE_CART } from "./Index"
import { BASEURL } from '../Assets/URLS';
import getHeaderToken from '../Helpers/getHeaderToken';
import axios from 'axios'
import {getCartLocalStorage, saveCartDb } from '../Helpers/localstorage'

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
      const json = await axios.get(`${BASEURL}/products`);

      const cartLocal = getCartLocalStorage()
      const {products } = cartLocal
      console.log(products , 'productos storage')
      console.log('db' , data)
      let newCart = {}
      let carritoDB = data.CarritoDetalles?.map(el => {
         return { id: el.productoId, quantity: el.cantidad }
     })
     console.log(carritoDB)
     if(products.length ){
        console.log('entro')
     if(carritoDB.length){
       for(let cartDB of carritoDB){
        let itemCart = products.find(e => e.id === cartDB.id);
         if (itemCart) {
           
            let newProducts = products.map(item => 
                 item.id === cartDB.id
                 ?{...item, quantity: item.quantity + cartDB.quantity }
                 : item )
             
             
             newCart = {
                 products: newProducts,
                 precioTotal: newProducts.reduce((prev, e) => {
                     let prod = json.data.find(el => el.id === e.id);

                     return Math.round((prev + (prod.price * e.quantity)) * 100) / 100;
                 }, 0)

             };
             console.log(newCart)
             } else {
             newCart = {
                 products: [...products, { id: cartDB.id, quantity: cartDB.quantity }],
                 precioTotal: Math.round((cartLocal.precioTotal + json.data.find(e => e.id === cartDB.id).price) * 100) / 100
             };
             console.log(newCart)
            }
       }
         console.log(newCart)
       saveCartDb(newCart)

      } else{
         newCart = {
            products: products,
            precioTotal: products.length ? carritoDB.reduce((prev, e) => {
                let prod = json.data.find(el => el.id === e.id);
   
                return Math.round((prev + (prod.price * e.quantity)) * 100) / 100;
            }, 0)
            : 0
         }
         saveCartDb(newCart)
      }

     }else{
      newCart = {
         products: carritoDB,
         precioTotal: carritoDB.length ? carritoDB.reduce((prev, e) => {
             let prod = json.data.find(el => el.id === e.id);

             return Math.round((prev + (prod.price * e.quantity)) * 100) / 100;
         }, 0)
         : 0
     };
     saveCartDb(newCart)
     }
      return dispatch({ type: GET_CART, payload: newCart , idCart: data.id});

   } catch (err) {
     
      return console.log(err.response.data);
   }
}

export const createCartDb = async () => {

   try{

   await axios.post(`${BASEURL}/carritos`,
      {},
      getHeaderToken())

 }catch(e){
     console.log(e)
     
   }
}

export const addItemCart = async (cart, id) => {

   try{
   await axios.put(`${BASEURL}/carritos/add`,
      {
         carritoId: id,
         productoId: cart.id,
         cantidad: cart.quantity
      }, getHeaderToken())
           
     

   }catch(e){
     console.log(e)   
     
    }
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