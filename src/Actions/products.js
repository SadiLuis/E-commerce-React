import axios from 'axios';
import { BASEURL } from '../Assets/URLS';

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
  
