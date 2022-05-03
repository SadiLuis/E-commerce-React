

const initialState = {
    allPedidos: [],
    filteredPedidos: [],
    pedidoDetail: null,
    userPedidos: []
}

export default function pedidosReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case "GET_PEDIDOS_BY_USER":
            return { ...state, userPedidos: payload };
        
        
            default:
            return { ...state }
    }
}