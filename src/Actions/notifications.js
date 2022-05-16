import axios from 'axios';
import { BASEURL } from '../Assets/URLS';

export function deleteChatNotifications(idUser) {
    return async function(dispatch) {
        try{
           var json = await axios.delete(`${BASEURL}/notifications/chat/${idUser}`)
           return dispatch({
            type: "DELETE_CHAT_NOTIFICATIONS",
            payload: json.data
         })

           
           
        } catch(err){
           console.log(err)
        }
     }
}

export function deleteNotifications(idUser) {
    return async function(dispatch) {
        try{
           var json = await axios.delete(`${BASEURL}/notifications/${idUser}`)
           return dispatch({
            type: "DELETE_NOTIFICATIONS",
            payload: json.data
         })
           
           
        } catch(err){
           console.log(err)
        }
     }
}

export function getChatNotifications(idUser) {
    return async function (dispatch) {
       try {
          var json = await axios.get(`${BASEURL}/notifications/chat/${idUser}`);
          return dispatch({
             type: "GET_CHAT_NOTIFICATIONS",
             payload: json.data
          })
       } catch (err) {
          console.log(err)
       }
    }
 }

 
export function getNotifications(idUser) {
    return async function (dispatch) {
       try {
          var json = await axios.get(`${BASEURL}/notifications/${idUser}`);
          return dispatch({
             type: "GET_NOTIFICATIONS",
             payload: json.data
          })
       } catch (err) {
          console.log(err)
       }
    }
 }