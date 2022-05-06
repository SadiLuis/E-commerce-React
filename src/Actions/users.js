import axios from 'axios';
import { BASEURL } from '../Assets/URLS';
import {getUserDetail} from './Auth'


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

 export function updateOrderUser(body) {
   return async function (dispatch) {
      try {
         await axios.post(
            `${BASEURL}/user/updateOrder`,
            body,
         
         )
         dispatch(getUserDetail());
        
      } catch (err) {
         console.log(err)
      }
   }
}