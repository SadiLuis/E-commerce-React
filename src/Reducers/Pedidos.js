
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
                pedidosById: payload
            }
        case 'GET_PEDIDO_DETAIL':
           return { ...state, pedidoDetail: payload }
        
        case 'EDIT_STATUS':
            return {
                ...state,
                allPedidos: payload,
                filteredPedidos: payload
            }
            default:
            return { ...state }
        
    }     
}