import axios from 'axios';
import { BASEURL } from '../Assets/URLS';
import Swal from "sweetalert2";


export function WhatsApp(price, title) {
    return async function (dispatch) {
       try {
          let res = await axios.get(`${BASEURL}/whatsapp`);
          let whatsapp = res.data 
          window.open("https://wa.me/" + whatsapp + "?text=Me%20gustaria%20saber%20un%20poco%20mas%20de%0A%0AProducto: " + title + "%0APrecio: $" + price)

       } catch (err) {
          console.log(err)
        }
     }
 }