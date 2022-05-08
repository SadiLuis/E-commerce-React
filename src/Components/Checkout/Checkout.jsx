import React , {useState}from "react";
import Details from "./CheckoutDetail/CheckoutDetail";
import {  useSelector } from "react-redux";
import style from "./Checkout.module.css";
import { Card, ListGroup, Form } from "react-bootstrap";
import BotonPago from '../BtnPago/BtnPago'
import {Loader} from '../Loader/Loader'

const Checkout = () => {
  
  const pedidoDetail =useSelector((state) => state.ordersReducer.orderDetail) || {};
  const { totalPedido, usuarioId } = pedidoDetail;
  const detailSend = useSelector((state) => state.loginReducer.userDetail)
 
  

  const [order, setOrder] = useState({
    username: detailSend?.usuario,
    address:detailSend?.direccion,
    phone: detailSend?.telefono,
    contactName:detailSend?.nombre,
    city: detailSend?.ciudad,
    id: usuarioId
    
  });

 console.log(usuarioId , detailSend.id)
  
  const handleChange = (e) => {
    
    e.preventDefault();
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };
 
  return (
    <div className={style.cnt}>
      <div className="container">
        {pedidoDetail ? (
          <div>
            <div>
              <Card className={style.card}>
                <div className={style.headers}>
                  <Card.Header className={style.title}>
                    1 - Datos Personales
                  </Card.Header>
                </div>
                <ListGroup className={style.listgroup}>
                  <ListGroup.Item className={style.listgroup}>
                    <div className={style.labels}>
                      <label> Nombre </label>{" "}
                      <Form.Control
                        name="contactName"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        className={style.input}
                        type="text"
                        placeholder="Nombre"
                        defaultValue={detailSend.nombre}
                      />
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className={style.listgroup}>
                    <div className={style.labels}>
                      <label> Usuario </label>
                      <Form.Control
                        className={style.input}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        name="username"
                        type="text"
                        placeholder="Usuario"
                        defaultValue={detailSend.usuario}
                      />
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className={style.listgroup}>
                    <div className={style.labels}>
                      <label> Teléfono </label>{" "}
                      <Form.Control
                        className={style.input}
                        type="text"
                        placeholder="Teléfono"
                        name="phone"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        defaultValue={detailSend.telefono}
                      />
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </div>
            <div>
              <div className={style.headers}>
                <Card.Header className={style.title}>
                  2 - Datos de Envío
                </Card.Header>
              </div>
             
              <Card.Body className={style.card} >
                   <div className={style.labels}>
                    <Form.Group className={style.datosEnvio}>
                      <Form.Label className={style.labels}>
                        Ciudad
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ciudad"
                        name="city"
                        className={style.inputDatosEnvio}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        defaultValue={detailSend.ciudad}
                      />
                    </Form.Group>
                  </div>
                  <div className={style.labels}>
                    <Form.Group className={style.datosEnvio}>
                      <Form.Label className={style.labels}>
                        Domicilio de envío
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Domicilio de Envío"
                        name="address"
                        className={style.inputDatosEnvio}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        defaultValue={detailSend.direccion}
                      />
                    </Form.Group>
                  </div>
                  
              </Card.Body>
            </div>
            
            
            <Details />
            

            <p className={style.total}> Total $ {totalPedido} </p>
            <div className={style.buttonConfirmarCompra}>
            <BotonPago price={totalPedido}  order= {order}/>
             
            </div>
          </div>
        ) : (
          
           <Loader />
          
        )}
      </div>
    </div>
  );
};
export default Checkout;