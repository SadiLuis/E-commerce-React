import axios from 'axios';
import { BASEURL } from '../Assets/URLS';



 export function getAllUsers(){
    return async function(dispatch) {
       try{
          var json = await axios.get(`${BASEURL}/user/all`)
          return dispatch({
             type: 'GET_ALL_USERS',
             payload: json.data
          })
       } catch(err){
          console.log(err)
       }
    }
 }