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