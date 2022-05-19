import React , {useState}from "react";
import Details from "./CheckoutDetail/CheckoutDetail";
import {  useSelector , useDispatch } from "react-redux";
import style from "./Checkout.module.css";
import { Card, ListGroup, Form } from "react-bootstrap";
import BotonPago from '../BtnPago/BtnPago'
import {Loader} from '../Loader/Loader'
import {updateOrderUser} from '../../Actions/users'
import Swal from 'sweetalert2'
const Checkout = () => {
  
  const pedidoDetail =useSelector((state) => state.ordersReducer.orderDetail) || {};
  const { totalPedido, usuarioId } = pedidoDetail;
  const detailSend = useSelector((state) => state.loginReducer.userDetail)
 const [info,setInfo] = useState(false)
  const dispatch = useDispatch()

  const [order, setOrder] = useState({
    username: detailSend?.usuario,
    address:detailSend?.direccion,
    phone: detailSend?.telefono,
    contactName:detailSend?.nombre,
    city: detailSend?.ciudad,
    id: detailSend?.id
    
  });

 
  
  const handleChange = (e) => {
    
    e.preventDefault();
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  const handleCompra = (e) => {
    console.log('entro')
    console.log(order)
    e.preventDefault()
        if (!order.phone || !order.contactName || !order.username || !order.address || !order.city) {
          setInfo(false)
       Swal.fire({
            icon: 'error',
            title: 'Datos incompletos',
            text: 'Por favor complete los campos nuevamente',
           
          })
       }else{
      dispatch(updateOrderUser(order))
      setInfo(true)
       }
  }
 
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
                <span>LOS CAMPOS SON OBLIGATORIOS <b style={{fontSize:'20px' , margin:'auto'}}>*</b></span>
                <ListGroup className={style.listgroup}>
                  <ListGroup.Item className={style.listgroup}>
                    <div className={style.labels}>
                      <label>Nombre*</label>{" "}
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
                      <label>Usuario*</label>
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
                      <label>Teléfono*</label>{" "}
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
                       Ciudad*
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
                      <Form.Label className={style.labels} style={{marginLeft:'55px'}}>
                      Domicilio*
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
              <div style={{display:'flex' ,justifyContent:'center' , paddingBottom:'15px'}}>
              <button className="btn btn-outline-dark" onClick={handleCompra} >Confirmar datos</button>
              </div>
            </div>
            
            
           { info && (<>
           <Details />
            

            <p className={style.total}> Total $ {totalPedido} </p>
            <div className={style.buttonConfirmarCompra}>
            <BotonPago price={totalPedido} info={info} />
             
            </div>
            </>)}
          </div>
        ) : (
          
           <Loader />
          
        )}
      </div>
    </div>
  );
};
export default Checkout;