
const initialState = {
    pedidosById: []
}

export default function pedidosReducer (state= initialState, action) {
    
    switch(action.type){
        case 'GET_ORDERS_ID': 
            return{
                ...state,
                pedidosById: action.payload
            }
        default: return {...state}    
    }
}