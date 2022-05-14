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
     
      let newCart = {};
      let newProducts= [];
      let carritoDB = data.CarritoDetalles?.map(el => {
         return { id: el.productoId, quantity: el.cantidad }
     })
    
     if(products.length ){
        console.log('entro')
     if(carritoDB.length){
       
       let auxCart=[];
        
        
           carritoDB.forEach(cartDB => {
            newProducts = products?.map(item =>  
                 item.id === cartDB.id
                 ?{quantity: item.quantity + cartDB.quantity }
                 : item )
            })

           for(let cart of newProducts){
            auxCart = carritoDB?.filter(cartDB => cartDB.id !== cart.id)
           }
             
             newCart = {
                 products: [...newProducts,...auxCart],
                 precioTotal:[...newProducts, ...auxCart].reduce((prev, e) => {
                     let prod = json.data.find(el => el.id === e.id);

                     return Math.round((prev + (prod.price * e.quantity)) * 100) / 100;
                 }, 0)

             };
             console.log(newCart)
            
             
       saveCartDb(newCart)

      } else{
         newCart = {
            products: products,
            precioTotal: products.length ? products.reduce((prev, e) => {
                let prod = json.data?.find(el => el.id === e.id);
   
                return Math.round((prev + (prod?.price * e.quantity)) * 100) / 100;
            }, 0)
            : 0
         }
         saveCartDb(newCart)
      }

     }else{
      newCart = {
         products: carritoDB,
         precioTotal: carritoDB.length ? carritoDB.reduce((prev, e) => {
             let prod = json.data?.find(el => el.id === e.id);

             return Math.round((prev + (prod.price * e.quantity)) * 100) / 100;
         }, 0)
         : 0
     };
     saveCartDb(newCart)
   }
   
      return dispatch({ type: GET_CART, payload: newCart , idCart: data.id});

   } catch (err) {
     
      return console.log(err);
   }
}

export const createCartDb = (id) => async dispatch => {

   try{

   await axios.post(`${BASEURL}/carritos`,
      {},
      getHeaderToken())

      dispatch(getCartDB(id))
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

export const deleteAllCartDB = async id =>  {
   try {
   
      await axios.delete(`${BASEURL}/carritos/${id}`, getHeaderToken())
     
      
   } catch (err) {
      return console.log(err);
   }
}

export const deleteAllCart = () => {
   return {
      type: DELETE_CART
   }
}