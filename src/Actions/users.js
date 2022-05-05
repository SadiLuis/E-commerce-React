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

 export function changeStatusUser(status,id){
    return async function(dispatch) {
       try {
          if(status!=='3'){
             //bloqueo
             const disabledUser = await axios.put(`${BASEURL}/user/block/${id}`);
             return dispatch({
                type: 'DISABLED_USER',
                payload: disabledUser.data
             })
          }else{
             //desbloqueo
             const enabledUser = await axios.put(`${BASEURL}/user/unlock/${id}`);
             return dispatch({
                type: 'ENABLED_USER',
                payload: enabledUser.data 
             })
          }
       } catch (error) {
          console.log(error)
       }
    }  
 }

 export function getUserById(id){
    return async function (dispatch){
       try {
          const user = await axios.get(`${BASEURL}/user/getUserById/${id}`);
          return dispatch({
             type: 'GET_USER_BY_ID',
             payload: user.data
          })
       } catch (error) {
          console.log(error)
       }
    }
 }

 export function cleanUserDetail(){
    return {
       type: 'CLEAR_USER_DETAIL'
    }
 }