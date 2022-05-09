const initialState = {
    conversations: [],
    friendData : [],
    messages: [],
    allUsers: []    
}

  
  
  
 export default function chatReducer(state = initialState, action) {

    switch (action.type) {

      case "GET_CHAT_CONVERSATIONS_BY_USER":
        return { 
            ...state, 
            conversations: action.payload 
        };
      
      case "GET_FRIEND_DATA":
        return {
          ...state,
          friendData: action.payload
        };  
      case "GET_CHAT_MESSAGES_BY_IDCONVER":
        return {
          ...state,
          messages: action.payload
        }
      case "GET_ALL_USERS": 
       return {
         ...state, 
         allUsers: action.payload
       }    
            
      default:
        return {...state};
    }
  };