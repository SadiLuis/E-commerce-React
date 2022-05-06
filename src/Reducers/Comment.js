const initialState = {
    comentariosProducto: [],   
    ratingProducto: []  
}

  
  
  
 export default function commentReducer(state = initialState, action) {

    switch (action.type) {

      case "GET_COMMENT_BY_PRODUCT":
        return { 
            ...state, 
            comentariosProducto: action.payload 
        };

        case "GET_PRODUCT_RATING":
          return {
            ...state,
            ratingProducto: action.payload
          }

            
      default:
        return {...state};
    }
  };
  
