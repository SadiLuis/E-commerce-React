import axios from 'axios';
import { BASEURL } from '../Assets/URLS';

 export function getChatConversations(conversationId){
    return async function(dispatch) {
       try{
          var json = await axios.get(`${BASEURL}/chatconversation/${conversationId}`)
          return dispatch({
             type: 'GET_CHAT_CONVERSATIONS_BY_USER',
             payload: json.data
          })
       } catch(err){
          console.log(err)
       }
    }
 }


 export function getFriendData(idUser){
   return async function(dispatch) {
      try{
         var json = await axios.get(`${BASEURL}/user/${idUser}`)
         return dispatch({
            type: 'GET_FRIEND_DATA',
            payload: json.data
         })
      } catch(err){
         console.log(err)
      }
   }
}

export function getChatMessages(conversationId){
   return async function(dispatch) {
      try{
         var json = await axios.get(`${BASEURL}/chatmessage/${conversationId}`)
         return dispatch({
            type: 'GET_CHAT_MESSAGES_BY_IDCONVER',
            payload: json.data
         })
      } catch(err){
         console.log(err)
      }
   }
}

export function postChatMessage(message){
   return async function(dispatch){
      try {
         var json = await axios.post(`${BASEURL}/chatmessage`, message)
      }catch(err){
         
         console.log(err)
      }
   }
}

   export function postChatConversations(payload){
      return async function(dispatch){
         try {
            var json = await axios.post(`${BASEURL}/chatconversation`, payload)
         }catch(err){
            
            console.log(err)
         }
      }
   }

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