import axios from 'axios';
import { BASEURL } from '../Assets/URLS';
import getHeaderToken from '../Helpers/getHeaderToken';


export function getPedidosById (userId) {
    return async function (dispatch){
        try{
            const config = getHeaderToken();
            const json = await axios.get(`${BASEURL}/pedidos/user/${userId}`, config
                )
        return dispatch({
            type: 'GET_ORDERS_ID',
            payload: json.data
        })
        }catch(err){
            console.log(err.response.data)
        }
        
    }
}