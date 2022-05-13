import React from 'react'
import {useSelector} from "react-redux"
import MailEnviado from './MailEnviado';
import MailEntregado from './MailEntregado';

function Status() {
    const order = useSelector(state => state.ordersReducer.orderDetail);
    const userById = useSelector(state => state.userReducer.userDetail);
    console.log(order)
    console.log(userById)
  return (
    <div>
        {order.status==="ENVIADO" ?
                                     <MailEnviado 
                                     nombre={userById.nombre}
                                      email={userById.email}
                                       cantidad={order?.productos?.map((c)=>c.cantidad)}
                                       producto={order?.productos?.map((p)=>p.producto)}
                                       total={order?.productos?.map((t)=>t.totalPedido)}
                                      pedidoId={order?.pedidoId}
                                     direccion={userById.direccion}
                                     ciudad={userById.ciudad}
                                      provincia={userById.provincia}
                                     /> :<></> 
                                        } 

                                           
                                              {order.status==="ENTREGADO" ?
                                            <MailEntregado 
                                        nombre={userById.nombre}
                                        email={userById.email}
                                          pedidoId={order?.pedidoId}
                                        direccion={userById.direccion}
                                         ciudad={userById.ciudad}
                                        provincia={userById.provincia} 
                                         /> : <></>
                                            }  
    </div>
  )
}

export default Status