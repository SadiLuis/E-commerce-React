import React from "react";
import { useDispatch } from "react-redux";
import { getPedidosById } from "../../Actions/Pedidos";
import { useSelector } from "react-redux";
import { getUserDetail } from "../../Actions/Auth";
import styles from './Orders.module.css'
export default function Orders (){

    const dispatch = useDispatch()
    const myUser = useSelector((state)=> state.loginReducer.userDetail)
    const pedidos = useSelector((state)=> state.pedidosReducer.pedidosById)
    
    React.useEffect(() => {
       dispatch(getUserDetail())
        myUser && dispatch(getPedidosById(myUser.id)) 
   }, [myUser?.id]) 
    
    return(
        
        <div>
           <h2 className={styles.title}>Historial de pedidos</h2> 
           
           <table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">Fecha</th>
      <th scope="col">Estado</th>
      <th scope="col">Productos</th>
      <th scope="col">Total</th>
    </tr>
  </thead>
  {
     pedidos.length && pedidos.map(e=> (
         
         <tbody key={e.pedidoId}>
    <tr>
      <th scope="row" style={{width: '15rem', border:'1px solid black'}}>{e.fechaCreacion && e.fechaCreacion.slice(0,10)}</th>
       {e.status === 'PENDIENTE'? <td style={{color: 'red', border:'1px solid black'}}>{e.status}</td> : <td style={{color: 'green', border:'1px solid black'}}>{e.status}</td>}
      <td style={{border:'1px solid black'}}>{e.productos && e.productos.map(e=>(
          
          <p key={e.pedidoId}>{e.producto}</p>
      ))}</td>
      <td style={{border:'1px solid black'}}><b>{e.totalPedido}</b></td>
    </tr>
  
  </tbody>
     )) 
  }
  
</table>
        </div>
    )
}