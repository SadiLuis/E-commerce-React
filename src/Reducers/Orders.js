
import {savePedido , getPedido} from '../Helpers/localstorage'
const initialState = {
    allOrders: [],
    filteredOrders: [],
    orderDetail: getPedido(),
    userOrders: []
}

export default function ordersReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case 'GET_ORDER_BY_USER':
            return { ...state, userOrders: payload };
        case 'GET_ORDER_DETAIL':
             savePedido(payload)
            return { ...state, orderDetail: payload }
        case 'GET_ORDERS':
            return {
                ...state,
                allOrders: payload,
                filteredOrders: payload
            }
        case 'EDIT_STATUS_ORDER':
            return {
                ...state,
                allOrders: payload,
                filteredOrders: payload
            }
        default:
            return { ...state }
    }
}
