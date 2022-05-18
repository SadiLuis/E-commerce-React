import React, { useEffect } from 'react'
import { useDispatch , useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {Pago} from '../../Actions/pago'
import {deleteAllCartDB} from '../../Actions/cart'
import axios from 'axios';
import Swal from 'sweetalert2'
const BotonPago = (props) => {
  const idUser = useSelector(state=> state.loginReducer.userDetail.id)
const dispatch = useDispatch()
let price = props.price
const CORS_URL = 'http://localhost:3000'
 const urlMercadoPago = "https://api.mercadopago.com/checkout/preferences";

const bodyPago = {
  payer_email:'test_user_71811293@testuser.com',
  items: [
    {
      title: "Tienda de Muebles",
      description: "Tienda de muebles",
      picture_url: "https://png.pngtree.com/png-clipart/20190520/original/pngtree-girl-taking-a-taxi-out-taxitrunktravel-png-image_4032278.jpg",
      category_id: "category123",
      quantity: 1,
      unit_price: price
    }
  ],
  back_urls: {
    failure:  CORS_URL + "/pago",
    pending: "/pending",
    success: CORS_URL + "/pago"
  },
  payment_methods: {
      excluded_payment_types: [
          {
              id: "ticket"
          }
      ],
        installments: 12
    }
}


   
   async function handlePago(e) {
    console.log(props.info)
        e.preventDefault()
        if (props.info) {
          const respuesta = await axios.post(urlMercadoPago, bodyPago, {
                       headers: {
                         "Content-Type": "application/json",
                          Authorization: `Bearer ` + 'APP_USR-6783227213516217-031919-fdbab35cb3c110743626d1534eecc893-1092642418'
                       }
                     })
                     setTimeout(function () {
                        window.location.href = respuesta.data["init_point"];
                      }, 3000);
                      
                    Swal.fire({
                       title:"Estás por ser redirigido al sitio de mercadoPago para concretar el pago",
                        icon: 'warning',
                         showConfirmButton: true,
                         confirmButtonText: 'Acepto!'
            
                      })
       }
       
   }
        
       
        

        
    return (
            <button className="btn btn-outline-dark" type="button" onClick={handlePago}>Pagar</button>
  )
}

export default BotonPago