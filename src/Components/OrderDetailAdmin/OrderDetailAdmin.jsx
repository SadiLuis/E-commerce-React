import React, { useEffect, useId } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { editStatusOrder, getOrderById } from '../../Actions/orders';
import { getUserById } from '../../Actions/users';
import ordersReducer from '../../Reducers/Orders';
import SidebarAdmin from '../SidebarAdmin/SidebarAdmin'

const OrderDetailAdmin = () => {
    const dispatch = useDispatch();
    const { id, idUser } = useParams();
    const order = useSelector(state => state.ordersReducer.orderDetail);
    const userById = useSelector(state => state.userReducer.userDetail)
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getOrderById(id));
        dispatch(getUserById(idUser))
    }, [dispatch, id])

    const changeStatus = (status, num) => {
        if (status === 'ENPROCESO') {
            Swal.fire({
                title: 'Estas seguro',
                text: `Estas por despachar el pedido N: ${num}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, despachar',
                cancelButtonText: 'No, cancelar'
            }).then(result => {
                if (result.isConfirmed) {
                    dispatch(editStatusOrder(num, "ENVIADO"))
                    Swal.fire(
                        'despachado',
                        `Pedido despachado`,
                        'success'
                    )
                    navigate('/dashboard/admin/orders')
                }
            })
        } else {
            if (status === 'ENVIADO') {
                Swal.fire({
                    title: 'Estas seguro',
                    text: `Estas por marcar como entregado el pedido N: ${num}`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No, cancelar'
                }).then(result => {
                    if (result.isConfirmed) {
                        dispatch(editStatusOrder(num, "ENTREGADO"))
                        Swal.fire(
                            'entregado',
                            `Pedido entregado`,
                            'success'
                        )
                        navigate('/dashboard/admin/orders')
                    }
                })
            }
        }
    }
    const keyId = useId();
    return (
        <div className="container-fluid">
            <div className='row min-vh-100'>
                <div className="col-auto col-md-2 col-xl-2 px-0 ">
                    <SidebarAdmin />
                </div>
                <div className='col'>
                    <div className="row">
                        <div className="col my-2">
                            <div className="row h4 ms-2">Detalle del pedido</div>
                        </div>
                        <div className="col d-flex justify-content-end my-2">
                            {order?.status === 'PENDIENTE'
                                ? (<button type="button" className="btn btn-lg btn-warning" disabled>
                                    Pendiente de pago
                                </button>)
                                : order.status === 'ENPROCESO'
                                    ? (<button type="button"
                                        className="btn btn-lg btn-success"
                                        onClick={() => changeStatus(order.status, order.pedidoId)}>
                                        Despachar pedido
                                    </button>)
                                    : order.status === 'ENVIADO'
                                        ? (<button type="button"
                                            className="btn btn-lg btn-success"
                                            onClick={() => changeStatus(order.status, order.pedidoId)}>
                                            Pedido entregado
                                        </button>)
                                        : (<button type="button" className="btn btn-lg btn-primary" disabled>
                                            Pedido entregado
                                        </button>)
                            }

                        </div>
                    </div>

                    {/* <div className="row">
                        <div className="col">
                            {order.status==='PENDIENTE'
                                ?<button>Aceptar</button>
                                :<button>Rechazar</button>
                            }

                        </div>
                    </div> */}

                    <div className="row">
                        <div className="col">

                            <div className="card border-dark mb-3">
                                <div className="card-header text-center">
                                    Usuario:{userById.usuario}
                                </div>
                                <div className="card-body text-start">
                                    <div className="row">
                                        <div className="col">
                                            <p className="mb-0 fs-5">numero pedido:</p>
                                        </div>
                                        <div className="col">
                                            <p className="mb-0 fs-5">{order?.pedidoId}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <p className="mb-0 fs-5">Estado:</p>
                                        </div>
                                        <div className="col">
                                            <p className="mb-0 fs-5">
                                                {order?.status === 'PENDIENTE'
                                                    ? 'Sin pagar'
                                                    : order.status === 'ENPROCESO'
                                                        ? 'Pagado'
                                                        : order.status === 'ENVIADO'
                                                            ? 'Enviado'
                                                            : 'Entregado'
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <p className="mb-0 fs-5">Email</p>
                                        </div>
                                        <div className="col">
                                            <p className="mb-0 fs-5">{userById.email}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <p className="mb-0 fs-5">Fecha:</p>
                                        </div>
                                        <div className="col">
                                            <p className="mb-0 fs-5">{order.fechaCreacion?.slice(0, 10)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="row">
                        <div className="col">

                            <div className="card border-dark">
                                <div className="card-header text-center">
                                    Articulos
                                </div>
                                <div className="card-body">
                                    {order.productos?.map((p, keyId) => (
                                        <div key={`article-${keyId}`} className="row">
                                            <div key={`quantity-${keyId}`} className="col">
                                                <p className="mb-0 fs-5">
                                                    {p.producto}X{p.cantidad}
                                                </p>
                                            </div>
                                            <div key={`price-${keyId}`} className="col">
                                                <p className="mb-0 fs-5">P.U.={p.precioUnitario}</p>
                                            </div>
                                            <div key={`total-${keyId}`} className="col">
                                                <p className="mb-0 fs-5">Total:{p.total}</p>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetailAdmin