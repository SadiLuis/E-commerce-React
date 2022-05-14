import React, { useMemo } from "react";
import {Link} from 'react-router-dom'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPedidosById } from "../../Actions/Pedidos";
import { useSelector } from "react-redux";
import { getUserDetail } from "../../Actions/Auth";
import styles from './Orders.module.css'

import HistoryOrders from "./HistoryOrders";




export default function MyOrders (){
  
  const dispatch = useDispatch()
  const myUser = useSelector((state)=> state.loginReducer.userDetail)
  const pedidos = useSelector((state)=> state.pedidosReducer.pedidosById)
 
 console.log(pedidos)
   React.useEffect(() => {
    
    dispatch(getPedidosById(myUser.id)) 
  }, [myUser])  

  React.useEffect(() => {
    dispatch(getUserDetail())
  }, [])

 
  

    
    if (pedidos.status == 404) {
      return (<h1 className={styles.title}>No tiene pedidos cargados aún</h1>)
    }else {
        

     

      return (
       <div>
        <h1 className={styles.title}>Historial de pedidos</h1>
          {
            pedidos.length && pedidos.map(e => (
                <div>
                <HistoryOrders fecha={e.fechaCreacion} productos={e.productos} total={e.totalPedido} status={e.status} pedidoId={e.pedidoId}/>
                
                </div>
               
                
            )
          
            )
          }
   
     
    </div>
  );
}
      
};