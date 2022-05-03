const initialState = {
    comentariosProducto: []    
}

  
  
  
 export default function commentReducer(state = initialState, action) {

    switch (action.type) {

      case "GET_COMMENT_BY_PRODUCT":
        return { 
            ...state, 
            comentariosProducto: action.payload 
        };

            
      default:
        return {...state};
    }
  };
  
