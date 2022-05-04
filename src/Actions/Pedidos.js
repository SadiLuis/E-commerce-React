import axios from 'axios';
import { BASEURL } from '../Assets/URLS';
import getHeaderToken from '../Helpers/getHeaderToken';

export const getPedidosByUser = (userId) => async dispatch => {
    try {
       let config = getHeaderToken();
       const { data } = await axios.get(
          `${BASEURL}/pedidos/user/${userId}`,
          config
       );
       return dispatch({ type: "GET_PEDIDOS_BY_USER", payload: data });
    } catch (err) {
       return console.log(err.response.data);
    }
 }


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
