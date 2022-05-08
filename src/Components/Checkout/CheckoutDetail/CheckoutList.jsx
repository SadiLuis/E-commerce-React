import React from "react";
import { useSelector } from "react-redux";



const CheckoutList = () => {
  const pedidoDetail =
  useSelector((state) => state.ordersReducer.orderDetail) || {};
  const {productos , totalPedido , pedidoId} = pedidoDetail
  let total = totalPedido >= 7000 ? 0 : 150
  return (
    <div className="mb-4">
    <div className="container bg-light rounded-15">
      <h3>Resumen del pedido Nº: {pedidoId}</h3>
      <table className="table table-bordered align-middle">
        <thead>
          <tr>
            <td className="h5">ID pedido</td>
            <td className="h5">Producto</td>
            <td className="h5">Precio Unitario</td>
            <td className="h5">Cantidad</td>
            <td className="h5">Subtotal</td>
          </tr>
        </thead>
        <tbody>
          {pedidoDetail ? (
            productos?.map((prod) => {
              return (
                <tr key={prod.pedidoId}>
                  <td>{prod.pedidoId}</td>
                  <td>{prod.producto}</td>
                  <td>$ {prod.precioUnitario}</td>
                  <td>{prod.cantidad}</td>
                  <td>
                    $ {prod.total}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={"5"}>
                Es posible que sus productos se hayan eliminado
              </td>
            </tr>
          )}
          <tr>
            <td colSpan={"4"} className="h5">
              Costo de envío
            </td>
            <td >$ {total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
 
  );
};

export default CheckoutList;