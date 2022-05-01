import axios from 'axios';
import { BASEURL } from '../Assets/URLS';
import { SEARCH_BY_NAME, GET_CATEGORIES, FILTER_BY_CATEGORY, ORDER_BY_PRICE, ORDER_BY_RATE, ORDER_ALFABETICAMENTE } from './Index';
import Swal from "sweetalert2"

export function getProductById(id) {
    return async function (dispatch) {
       try {
          var json = await axios.get(`${BASEURL}/products/${id}`);
          return dispatch({
             type: "GET_PRODUCT_BY_ID",
             payload: json.data
          })
       } catch (err) {
          console.log(err)
       }
    }
 }

 export function getAllProducts(){
    return async function(dispatch) {
       try{
          var json = await axios.get(`${BASEURL}/products`)
          return dispatch({
             type: 'GET_ALL_PRODUCTS',
             payload: json.data
          })
       } catch(err){
          console.log(err)
       }
    }
 }
 export const cleanUp = () => {
   let action = {
     type: 'CLEAN_UP'
  
   }
   return action

}
export function searchByName(name) {
   return async function (dispatch) {
      try {
         var respuesta = await axios.get(`${BASEURL}/products?title=${name}`) //OJO: VER BIEN LA ruta por query del back
         return dispatch({
            type: SEARCH_BY_NAME,
            payload: respuesta.data
         })
      } catch (err) {
         Swal.fire({
            position: "center",
            icon: "error",
            title: "Oops...",
            text: "No se encontró el producto!",
          });
        }
      }
   } 

   export function orderByPrice(payload) {
      return {
         type: ORDER_BY_PRICE,
         payload
      }
   }

   export function orderAlfabeticamente(payload) {
      return {
         type: ORDER_ALFABETICAMENTE,
         payload
      }
   }
   
   export function orderByRate(payload) {
      return {
         type: ORDER_BY_RATE,
         payload
      }
   }
   
   export function getCategories() {
      return async function (dispatch) {
          try {
              const responseCategories = await axios.get(`${BASEURL}/categories`)
              return dispatch({
                  type: GET_CATEGORIES,
                  payload: responseCategories.data
              })
          } catch (err) {
              console.log(err.response.data)
          }
      }
  }

   export function filterByCategory(payload) {
      return {
         type: FILTER_BY_CATEGORY,
         payload
   
      }
   }


 

   export function getProductsByCat(idCategory) {
      return async function (dispatch) {
         try {
            var json = await axios.get(`${BASEURL}/products/category/${idCategory}`);
            return dispatch({
               type: "GET_PRODUCT_BY_CAT",
               payload: json.data
            })
         } catch (err) {
            console.log(err)
         }
      }
   }
  

