import axios from 'axios';
import { BASEURL } from '../Assets/URLS';

export function getProductById(id) {
    return async function (dispatch) {
       try {
          var json = await axios.get(`${BASEURL}/products/${id}`);
          return dispatch({
             type: "GET_PRODUCT_BY_ID",
             payload: json.data
          })
       } catch (err) {
          console.log(err)
       }
    }
 }