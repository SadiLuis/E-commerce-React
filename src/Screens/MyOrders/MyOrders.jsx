import React, { useMemo } from "react";
import {Link} from 'react-router-dom'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPedidosById } from "../../Actions/Pedidos";
import { useSelector } from "react-redux";
import { getUserDetail } from "../../Actions/Auth";
import styles from './Orders.module.css'
import ProductTable from "../../Components/ProductTable/ProductTable";



export default function MyOrders (){
  
  const dispatch = useDispatch()
  const myUser = useSelector((state)=> state.loginReducer.userDetail)
  const pedidos = useSelector((state)=> state.pedidosReducer.pedidosById)
 
 
   React.useEffect(() => {
    
    dispatch(getPedidosById(myUser.id)) 
  }, [myUser])  

  React.useEffect(() => {
    dispatch(getUserDetail())
  }, [])

  
  
  const columns = useMemo(()=> [
    {
      Header: 'Fecha',
      accessor: 'fechaCreacion',
      Cell: data => {
        return data.value.slice(0,10)
      }
    },
    {
      Header: 'Estado',
      accessor: 'status',
      Cell: data => {
         return data.value === 'PENDIENTE' ? (<p style={{color: 'red'}}>{data.value}</p>) :
        (<p style={{color: 'green'}}>{data.value}</p>)
      }
    },

    {
      Header: "Productos",
      accessor: (row) => row.productos.map((a) => a.producto).join(" "),
      
      Cell: ({ row }) => (
        
        <span>
          
           {row.original.productos.map((e,i)=>  
            i === row.original.productos.length -1 ? 
            <div>
           
             <Link to={`/detail/${e.productoId}`}><p>{e.producto}</p></Link>
             <Link to={`/review/${e.productoId}`}><button style={{marginBottom: '0rem'}}>review</button></Link>
             
             </div>
             :
             <div>
              <div>
           
             <Link to={`/detail/${e.productoId}`}><p>{e.producto},</p></Link>
             <Link to={`/review/${e.productoId}`}><button>review</button></Link>
             
             </div>

             </div>
             )
             
             
             }

        </span>
       
      )
    },
    {
      Header: 'Total',
      accessor: 'totalPedido',
      Cell: data =>  <b><p>${data.value}</p></b>
    },
  ], [])

  const data = useMemo(()=> pedidos )
    
    if (pedidos.status == 404) {
      return (<h1>No tiene pedidos este usuario</h1>)
    }else {
        
      return (
      <div className="table-container">
        <h1 className={styles.title}>Historial de pedidos</h1>
      {
        
        <ProductTable columns={columns} data={data} />
      }
   
     
    </div>
  );
}
      
};