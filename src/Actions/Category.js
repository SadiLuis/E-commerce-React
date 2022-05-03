import axios from 'axios';
import { BASEURL } from '../Assets/URLS';

export function getAllCategories(){
    return async function(dispatch) {
       try{
          var json = await axios.get(`${BASEURL}/categories`)
          return dispatch({
             type: 'GET_ALL_CATEGORIES',
             payload: json.data
          })
       } catch(err){
          console.log(err)
       }
    }
 }

 export function postCategories(payload) {
   return async function (dispatch) {
       try {
           const response = await axios.post(`${BASEURL}/categories`, payload);
           return response.data;
       } catch (err) {
           console.log(err.response.data)
       }

   }
}

export function getCategories() {
   return async function (dispatch) {
       try {
           const responseCategories = await axios.get(`${BASEURL}/categories`)
           return dispatch({
               type: 'GET_CATEGORIES',
               payload: responseCategories.data
           })
       } catch (err) {
           console.log(err.response.data)
       }
   }
}