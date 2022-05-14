import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ListGroup, Button } from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux'
import { getUserDetail } from "../../Actions/Auth";
import {getOrderById} from '../../Actions/orders'
import {Loader } from '../../Components/Loader/Loader'


const DetailPedido = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const user = useSelector(state => state.loginReducer.userDetail)
  const orden = useSelector(state => state.ordersReducer.orderDetail)
  const dispatch = useDispatch()
 console.log(orden)
  useEffect(() => {
   dispatch(getUserDetail());
   dispatch(getOrderById(id))
  },[dispatch ])

  function onClick() {
    navigate("/orders");
  }
  

  return (
    <div>
     { orden ?
     (<div className="container">
          <ListGroup>
         { 
          orden?.status === 'PENDIENTE' ? (<ListGroup.Item variant="warning">
              {" "}
           <b>Estado del pedido:</b> tu pedido está pendiente de pago
            </ListGroup.Item>)
            : orden?.status === 'ENPROCESO' ? (<ListGroup.Item variant="info">
            {" "}
            <b>Estado del pedido:</b> tu pedido está pagado y en proceso de envío
          </ListGroup.Item>)
            : orden?.status === 'ENVIADO' ? (<ListGroup.Item variant="primary">
            {" "}
            <b>Estado del pedido:</b> tu pedido fue enviado
          </ListGroup.Item>)
            : (<ListGroup.Item variant="success">
            {" "}
            <b>Estado del pedido:</b> tu pedido fue entregado
          </ListGroup.Item>)
           }
          <ListGroup.Item>
             <b>Cliente:{" "}</b>  {user?.nombre}
            </ListGroup.Item>
            <ListGroup.Item><b>Telefono:{" "}</b> {user?.telefono}</ListGroup.Item>
            <ListGroup.Item>
              <b>Fecha:{" "}</b>
              {orden?.fechaCreacion.slice(0, 10)}
            </ListGroup.Item>
            <ListGroup.Item><b>ID del pedido:</b> {id} </ListGroup.Item>
           <ListGroup.Item><b>Estado del pago:</b>{orden.status === 'PENDIENTE' ? '  Pendiente' : '  Aprobada' }</ListGroup.Item>
           <ListGroup.Item><b>Dirección:</b> {user?.direccion }</ListGroup.Item> 
            <ListGroup.Item>
              <b>Productos:</b> {orden?.productos?.map((p) => p.producto + ", ")}
            </ListGroup.Item>
            <ListGroup.Item><b>Costo de envío:</b>{orden?.totalPedido >= 7000 ? ' $ 0' : ' $ 150'}</ListGroup.Item>
            
            <ListGroup.Item><b>Total:</b> ${orden?.totalPedido}</ListGroup.Item>
          </ListGroup>
          <Button className="container" variant="dark" onClick={onClick}>
            Volver
          </Button>
     
        </div>)
        : <Loader />
        }
       
      </div>
  )
};
export default DetailPedido; 