import React, { useMemo } from "react";
import {Link} from 'react-router-dom'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPedidosById } from "../../Actions/Pedidos";
import { useSelector } from "react-redux";
import { getUserDetail } from "../../Actions/Auth";
import styles from './Orders.module.css'
import ProductTable from "../../Components/ProductTable/ProductTable";
import HistoryOrders from "./HistoryOrders";



export default function MyOrders (){
  
  const dispatch = useDispatch()
  const myUser = useSelector((state)=> state.loginReducer.userDetail)
 
 
   React.useEffect(() => {
    dispatch(getUserDetail())
    myUser && dispatch(getPedidosById(myUser.id)) 
  }, [myUser?.id])  

  
  const pedidos = useSelector((state)=> state.pedidosReducer.pedidosById)
  

    
    return(
        
      <div >
        <h1 className={styles.title}>Historial de pedidos</h1>
          {
            pedidos.length && pedidos.map(e => (
                <div>
                <HistoryOrders fecha={e.fechaCreacion} productos={e.productos} total={e.totalPedido} status={e.status}/>
                
                </div>
               
                
            )
          
            )
          }
   
     
    </div>
  );
}