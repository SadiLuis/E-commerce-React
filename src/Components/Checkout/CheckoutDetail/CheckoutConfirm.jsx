 import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {changeStatus , editStatusOrder} from "../../../Actions/orders"
import { ListGroup, Button, Spinner } from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux'
import style from "./CheckoutItem.module.css";
// import ConfirmaciónMail from "../../ConfirmaciónMail/ConfirmaciónMail";
import Swal from "sweetalert2"


const CheckoutConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const datosPago = location.search.split("&");
  const user = useSelector(state => state.loginReducer.userDetail)
  const orden = useSelector(state => state.ordersReducer.orderDetail)
  console.log(user)
  console.log(orden)
  
  //ESTADO DE PAGO
  const status = datosPago[3].split("=");
  const statusPago = status[1];
  console.log(statusPago)
  const dispatch = useDispatch()
  const order = datosPago[4].split("=");
  const idOrder = order[1];
   console.log(datosPago)
  useEffect(() => {
   if(orden){
     dispatch(changeStatus(orden.pedidoId , true))
     dispatch(editStatusOrder(orden.pedidoId , "ENPROCESO"))
   }
  },[dispatch , orden])
  function onClick() {
    navigate("/home");
  }
  const alerta=()=> {
    Swal.fire({
    icon: 'info',
    title: 'Customice su producto',
    text: 'Un representante de MOBI ATR se contactará con usted para definir los detalles de su producto',
    
  })
}

  return (
    <div>
    {alerta()}
      {!orden ? (
        <div>
          <Spinner
            className={style.spinner}
            animation="grow"
            variant="secondary"
          />
        </div>
      ) : location.search &&
        location.search.includes("collection_status=approved") ? (
        <div className="container">
          <ListGroup>
            <ListGroup.Item variant="success">
              Compra procesada con éxito!
            </ListGroup.Item>

            {/*  acá primer mail */}

            {/* <ConfirmaciónMail 
              nombre={ user?.nombre}
             email= { user?.email}
             cantidad={ orden?.productos?.map((c)=>c.cantidad)}
             producto={ orden?.productos?.map((p)=>p.producto)}
             total= { orden?.productos?.map((t)=>t.total)}
             direccion={user?.direccion}
             ciudad={ user?.ciudad}
             provincia={ user?.provincia }
            /> */}


            <ListGroup.Item>
              Cliente: {user?.nombre}
            </ListGroup.Item>
            <ListGroup.Item>Tel: {user?.telefono}</ListGroup.Item>
            <ListGroup.Item>
              Fecha:{" "}
              {orden?.fechaCreacion.slice(0, 10)}
            </ListGroup.Item>
            <ListGroup.Item>ID de compra: {datosPago[2].split('=')[1]} </ListGroup.Item>
            <ListGroup.Item>Método de pago: {datosPago[5].split('=')[1] === "credit_card" ? ' Tarjeta de crédito' : ' Tarjeta de Debito'}</ListGroup.Item>
            <ListGroup.Item>Estado del pago: Aprobada</ListGroup.Item>
           <ListGroup.Item>Dirección: {user?.direccion }</ListGroup.Item> 
            <ListGroup.Item>
              Productos: {orden?.productos?.map((p) => p.producto + ", ")}
            </ListGroup.Item>
            <ListGroup.Item>Costo de envío:{orden?.totalPedido >= 7000 ? ' $ 0' : ' $ 150'}</ListGroup.Item>
            <ListGroup.Item>
              {" "}
           Estado del pedido: Estamos preparando tu pedido
            </ListGroup.Item>
            <ListGroup.Item>Total: ${orden?.totalPedido}</ListGroup.Item>
          </ListGroup>
          <Button className="container" variant="dark" onClick={onClick}>
            Volver
          </Button>
        </div>
      ) : (
        <div className="container">
          <ListGroup>
            <ListGroup.Item variant="danger">
              Algo pasó con el pago de tu orden!
            </ListGroup.Item>
            <ListGroup.Item>
              Cliente: {user?.nombre}
            </ListGroup.Item>
            <ListGroup.Item>Tel: {user?.telefono}</ListGroup.Item>
            <ListGroup.Item>
              Fecha:{" "}
              {orden?.fechaCreacion.slice(0, 10)}
            </ListGroup.Item>
            <ListGroup.Item>ID de compra: {order?.pedidoId} </ListGroup.Item>
            <ListGroup.Item>Estado del pago: Rechazado</ListGroup.Item>
            {user?.direccion}
            <ListGroup.Item>
              Productos: {orden?.productos?.map((p) => p.producto + ", ")}
            </ListGroup.Item>
            
            <ListGroup.Item>Total: ${orden?.totalPedido }</ListGroup.Item>
          </ListGroup>
          <Button className="container" variant="dark" onClick={onClick}>
            Volver
          </Button>
        </div>
      )}
    </div>
  );
};
export default CheckoutConfirm; 
