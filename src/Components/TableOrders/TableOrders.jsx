import React, { useEffect, useId, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getAllOrders, getOrderByNum, getOrdersByStatus, getOrdersByUser, getOrdersByUserAdmin } from '../../Actions/orders';
import { getAllUsers } from '../../Actions/users';
import { Loader } from '../Loader/Loader';
import Paging from '../Paging/Paging';

const TableOrders = () => {
    const dispatch = useDispatch();
    const [numPedido,setNumPedido] = useState("")


    useEffect(() => {
        dispatch(getAllOrders())
        dispatch(getAllUsers())
    }, [dispatch]);

    const orders = useSelector(state => state.ordersReducer?.filteredOrders)
    const users = useSelector(state=> state.userReducer.users)
    const [currentPage, setCurrentPage] = useState(1)
    const [ordersOnPage, setOrdersOnPage] = useState(10)
    const indexLastOrder = currentPage * ordersOnPage
    const indexFirstOrder = indexLastOrder - ordersOnPage;
    const currentOrders = orders?.slice(indexFirstOrder, indexLastOrder)

    const paginado = (pageNum) => {
        setCurrentPage(pageNum)
    }

    const id = useId();

    const handleCustomerChange = (e) => {
        if(e.target.value!=='All'){
            dispatch(getOrdersByUserAdmin(e.target.value))
            
        }else{
            if(e.target.value==='All')
            dispatch(getAllOrders())
        }
    }

    const handleStatusChange = (e) => {
        //console.log(e.target.value)
        if(e.target.value!=='All'){
            dispatch(getOrdersByStatus(e.target.value))
        }else{
            if(e.target.value==='All')
            dispatch(getAllOrders())
        }
    }

    const handleIdSubmit = (e) => {
        e.preventDefault();
        dispatch(getOrderByNum(numPedido))
        setNumPedido('')
    }
    
    const setSearchNumOrder = (e) => {
        setNumPedido(e.target.value)
    }
    
    if (!currentOrders) {
        return <Loader />
    } else {
        return (
            <>
                <div className="row mb-2">
                    <div className="col">
                        <select name="usuario" id="usuario" 
                            onChange={handleCustomerChange} 
                            className='form-select'>
                            <option value="All">Todos</option>
                            {users?.filter(r=>r.rol==='1').map((u,id)=>(

                                <option value={u.id} key={`user-${id}`}>{u.usuario}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col-auto">
                                <label htmlFor="stateOrder">Por estado:</label>
                            </div>
                            <div className="col">
                                <select name="stateOrder" id="stateOrder" onChange={handleStatusChange} className='form-select'>
                                    <option value="All" >Todos</option>
                                    <option value="PENDIENTE" >Sin Pagar</option>
                                    <option value="ENPROCESO" >Pagados</option>
                                    <option value="ENVIADO" >Enviados</option>
                                    <option value="ENTREGADO" >Entregados</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <form onSubmit={handleIdSubmit}>
                            <div className="row">
                                <div className="col">
                                    <input 
                                        type="text" 
                                        name="orderById" 
                                        id="orderById" 
                                        value={numPedido}
                                        placeholder='Numero de pedido' 
                                        className='form-control'
                                        onChange={setSearchNumOrder} />
                                </div>
                                <div className="col-auto">
                                    <button className='btn btn-outline-success'>Buscar</button>
                                </div>
                            </div>
                        </form>
                    </div>


                </div>
                <div className="row">
                    <div className='table-responsive'>
                    {Object.keys(currentOrders).length!==0 && currentOrders[0]!==''?
                        (<table className="table table-sm table-hover table-striped table-bordered border-dark">
                            <thead className='table-dark'>
                                <tr>
                                    <th scope="col-auto">Num. Pedido</th>
                                    <th scope="col">Usuario</th>
                                    <th scope="col">Comprador</th>
                                    <th scope="col">Detalle</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Fecha</th>

                                </tr>
                            </thead>
                            <tbody>
                                
                                    {currentOrders?.map((o, id) => (
                                    <tr key={`tr-${id}`}>
                                        <td key={`num-${id}`}>{o?.pedidoId}</td>
                                        <td key={`usuario-${id}`}>{o.usuario?.usuario}</td>
                                        <td key={`name-${id}`}>{o.usuario?.nombre}</td>
                                        <td key={`detail-${id}`}>

                                            <Link to={`/dashboard/admin/OrderDetailAdmin/${o?.pedidoId}/${o.usuario?.id}`}>
                                                Ver Detalle
                                            </Link>

                                        </td>
                                        <td key={`total-${id}`}>{o?.totalPedido}</td>
                                        <td key={`status-${id}`}>{
                                            o?.status === 'PENDIENTE'
                                                ? 'Sin pagar'
                                                : o?.status === 'ENPROCESO'
                                                    ? 'Pagado'
                                                    : o?.status === 'ENVIADO'
                                                        ? 'Pedido Enviado'
                                                        : o?.status === 'ENTREGADO'
                                                        && 'Pedido entregado'
                                        }
                                        </td>
                                        <td key={`date-${id}`}>{o.fechaCreacion?.slice(0, 10)}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>)
                        :<p className='row text-danger d-flex justify-content-center fs-5'>
                            No existen pedidos
                        </p>}
                    </div>
                    {Object.keys(currentOrders).length!==0 && currentOrders[0]!==''&&(
                    <div className='col'>
                        <Paging
                            productsOnPage={ordersOnPage}
                            allProducts={orders.length}
                            paginado={paginado}

                        />
                    </div>)}
                </div>

            </>
        )
    }

}

export default TableOrders