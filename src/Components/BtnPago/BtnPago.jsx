import React, { useEffect } from 'react'
import { useDispatch , useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {Pago} from '../../Actions/pago'
import { updateOrderUser } from '../../Actions/users';
import {deleteAllCartDB} from '../../Actions/cart'
import swal from 'sweetalert2'
const BotonPago = (props) => {
  const idUser = useSelector(state=> state.loginReducer.userDetail.id)
const dispatch = useDispatch()
let price = props.price
//   let idConductora = props.idConductora
  
//      const  body = {
//   payer_email: "test_user_71811293@testuser.com",
//   items: [
//     {
//       title: "Viaje en Her Way",
//       description: "Viaje en Her Way",
//       picture_url: "https://png.pngtree.com/png-clipart/20190520/original/pngtree-girl-taking-a-taxi-out-taxitrunktravel-png-image_4032278.jpg",
//       category_id: "category123",
//       quantity: 1,
//       unit_price: parseFloat(precio)
//     }
//   ],
//   back_urls: {
//     failure: "/failure",
//     pending: "/pending",
//     success: "http://localhost:3000/reviews/" + idConductora
//   },
//   payment_methods: {
//       excluded_payment_types: [
//           {
//               id: "ticket"
//           }
//       ],
//         installments: 1
//     }
// }

  
   
   async function handlePago(e, price) {
     
        e.preventDefault()
        if (!props.order.phone && !props.order.contactName && !props.order.username) {
         return swal("Por favor, completá los datos personales");
       }
        deleteAllCartDB(idUser)
        dispatch(updateOrderUser(props.order))
        dispatch(Pago(price))
   }
        
//         const respuesta = await axios.post(urlMercadoPago, body, {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ` + ACCESS_TOKEN
//             }
//          })
//          setTimeout(function () {
//             window.location.href = respuesta.data["init_point"];
//           }, 3000);
          
//           Swal.fire({
//             title:"Estás por ser redirigido al sitio de mercadoPago para concretar el pago",
//             icon: 'warning',
//             showConfirmButton: true,
//             confirmButtonText: 'Acepto!'

//           })
       
        
// }
        
    return (
            <button className="btn btn-outline-primary" type="button" onClick={(e)=> handlePago(e, price)}>Pagar con MP</button>
  )
}

export default BotonPago