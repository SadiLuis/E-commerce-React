import axios from 'axios';
//import { toast } from 'react-toastify';
import { BASEURL } from '../Assets/URLS';
import getHeaderToken from '../Helpers/getHeaderToken';
import { deleteAllCart, deleteAllCartDB } from './cart'
export const getDetailOrder = (order) => {
    return { type: 'GET_ORDER_DETAIL', payload: order };
}

export const postOrder = (order) => {
    return async function (dispatch) {
        try {
            const { data } = await axios.post(
                `${BASEURL}/pedidos`,
                order,
                getHeaderToken()
            );
            // console.log(data);

            return dispatch(getDetailOrder(data));
        } catch (err) {
            console.log(err.response.data);
        }
    }
}

export const deleteOrder = (orderId) => {
    return async function (dispatch) {
        try {
            await axios.delete(
                `${BASEURL}/pedidos/${orderId}`,
                getHeaderToken()
            );
            //toast.success("Pedido eliminado exitosamente");
            return dispatch(getDetailOrder(null));
        } catch (err) {
            //toast.error("No se ha podido eliminar el pedido");
            console.log(err.response.data);
        }
    }
}

export const getAllOrders = () => {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(
                `${BASEURL}/pedidos`,
                getHeaderToken()
            );

            return dispatch({ type: 'GET_ORDERS', payload: data });
        } catch (err) {
            console.log(err);
        }
    }
}

export const getOrdersByUser = (userId) => async dispatch => {
    try {
        let config = getHeaderToken();
        const { data } = await axios.get(
            `${BASEURL}/pedidos/user/${userId}`,
            config
        );
        return dispatch({ type: 'GET_ORDER_BY_USER', payload: data });
    } catch (err) {
        //toast.error("No se han podido cargar los pedidos");
        return console.log(err.response.data);
    }
}

export const getOrdersByUserAdmin = (userId) => async dispatch => {
    try {
        let config = getHeaderToken();
        const { data } = await axios.get(
            `${BASEURL}/pedidos/user/${userId}`,
            config
        );
        return dispatch({ type: 'GET_ORDER_BY_USER_ADMIN', payload: data });
    } catch (err) {
        //toast.error("No se han podido cargar los pedidos");
        return console.log(err.response.data);
    }
}

export const getOrdersByStatus = (value) => 

    async dispatch =>{
        const status = {value}
        try {
            //console.log(status)
            let config = getHeaderToken();
            const { data } = await axios.post(
                `${BASEURL}/pedidos/status`,
                status
            );
            return dispatch({ type: 'GET_ORDER_BY_STATUS', payload: data });
        } catch (err) {
            //toast.error("No se han podido cargar los pedidos");
            return console.log(err.response.data);
        }
    
} 

export function editStatusOrder(orderId, newStatus) {

    return async function (dispatch) {

        try {
            const body = {
                status: newStatus
            }
            const config = getHeaderToken()
            const response = await axios.put(`${BASEURL}/pedidos/${orderId}`, body, config)
            return dispatch({
                type: 'EDIT_STATUS_ORDER',
                payload: response.data
            })
        } catch (err) {
            return console.log(err.response.data);
        }
    }
}

export function getOrderById(orderId) {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${BASEURL}/pedidos/${orderId}`);
            return dispatch({
                type: 'GET_ORDER_BY_ID',
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getOrderByNum(pedidoId) {
    //console.log(pedidoId)
    return async function (dispatch) {
        const numOrder = {
            numPedido : parseInt(pedidoId)
        }
        console.log(numOrder)
        try {
            const response = await axios.post(`${BASEURL}/pedidos/pedidoById`, numOrder);
            return dispatch({
                type: 'GET_ORDER_BY_NUM',
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export function cleanOrderDetail() {
    return {
        type: 'CLEAN_ORDER_DETAIL'
    }
}

export function changeStatus(id, newStatus) {

    const body = {
        idPedido: id,
        status: newStatus
    }
    return async function (dispatch) {
        try {
            //const config = getHeaderToken()
            const response = await axios.post(`${BASEURL}/pedidos/update`, body)
            dispatch(deleteAllCart())
             
            return dispatch({
                type: 'EDIT_STATUS',
                payload: response.data
            })
        } catch (err) {
            return console.log(err.response.data);
        }
    }
}

export function sortOrders(key,value){
    return {
        type: 'SORT_ORDER',
        payload: {
            key,
            value
        }
       
    }
}

export function searchOrderByUser(value){

} 