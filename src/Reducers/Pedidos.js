
const initialState = {
    allPedidos: [],
    filteredPedidos: [],
    pedidoDetail: null,
    userPedidos: [],
    pedidosById: []

}

export default function pedidosReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case "GET_PEDIDOS_BY_USER":
            return { ...state, userPedidos: payload };
        case 'GET_ORDERS_ID': 
            return{
                ...state,
                pedidosById: action.payload
            }
      
            default:
            return { ...state }
        
    }     
}