import React, { useMemo } from "react";
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
 
 
   React.useEffect(() => {
    dispatch(getUserDetail())
    myUser && dispatch(getPedidosById(myUser.id)) 
  }, [myUser?.id])  

  
  const pedidos = useSelector((state)=> state.pedidosReducer.pedidosById)
  
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
           {row.original.productos.map((e,i)=>  <p>{e.producto}, </p>)}

        </span>
       
      )
    },
    {
      Header: 'Total',
      accessor: 'totalPedido'
    },
  ], [])

  const data = useMemo(()=> pedidos )
    
    return(
        
      <div className="table-container">
        <h1 className={styles.title}>Historial de pedidos</h1>
      {
        
        <ProductTable columns={columns} data={data} />
      }
   
     
    </div>
  );
}