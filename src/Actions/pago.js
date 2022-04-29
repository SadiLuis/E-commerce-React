import axios from 'axios';
import { BASEURL } from '../Assets/URLS';
import Swal from "sweetalert2";


export function Pago(price) {
    let body = {
        price: price
    }
    return async function (dispatch) {
       try {
          var res = await axios.post(`${BASEURL}/pago`, body);
          
          setTimeout(function () {
            window.location.href = res.data;
          }, 3000);
          
          await Swal.fire({
            title:"Estás por ser redirigido al sitio de mercadoPago para concretar el pago",
            icon: 'warning',
            showConfirmButton: true,
            confirmButtonText: 'Acepto!'

          })
          return dispatch({
             type: "PAGO",
             payload: res.data
          })
       } catch (err) {
          console.log(err)
       }
    }
 }