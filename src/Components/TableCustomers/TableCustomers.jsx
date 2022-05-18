import React, { useEffect, useState, useId } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { cleanOrderDetail } from '../../Actions/orders';
import { changeStatusUser, cleanUserDisabled, getAllUsers, orderUser } from '../../Actions/users';
import { Loader } from '../Loader/Loader';
import Paging from '../Paging/Paging';

const TableCustomers = () => {
    const dispatch = useDispatch();

    const [status, setStatus] = useState('')



    const customers = useSelector(state => state.userReducer.users)
    const userDisabled = useSelector(state => state.userReducer.userDisabled)
    const [currentPage, setCurrentPage] = useState(1)
    const [customersOnPage, setCustomersOnPage] = useState(10)
    const indexLastCustomer = currentPage * customersOnPage
    const indexFirstCustomer = indexLastCustomer - customersOnPage;
    //console.log(customers)

    const allCustomers = customers?.filter(c => c.rol !== '2');
    const currentCustomers = allCustomers?.slice(indexFirstCustomer, indexLastCustomer);

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch, userDisabled]);

    const id = useId();

    const paginado = (pageNum) => {
        setCurrentPage(pageNum)
    }

    function handleSelect(e) {
        e.preventDefault();
        dispatch(orderUser(e.target.value));

    }

    if (userDisabled === "El usuario tiene un pedido en espera no ha podido ser bloqueado") {
        Swal.fire(
            'Error',
            `${userDisabled}`,
            'error'
        )
        dispatch(cleanUserDisabled())
    } else {
        if (userDisabled === "Usuario bloqueado") {
            Swal.fire(
                'Deshabilitado',
                `Usuario deshabilitado`,
                'success'
            )
            dispatch(cleanUserDisabled())
        }
    }
    if (!currentCustomers) {
        return <Loader />
    } else {
        return (
            <>
                <div className="row mb-3">

                    <div className="col-8">
                        <span className="fs-4">Ordenar:</span>
                        <select className='form-select' onChange={handleSelect}>
                            <option value="cero">Ordenar clientes</option>
                            <option value="asc">Email(A-Z)</option>
                            <option value="desc">Email(Z-A)</option>
                            <option value="us-asc">Usuario(A-Z)</option>
                            <option value="us-desc">Usuario(Z-A)</option>
                            <option value="A-Z">Nombre(A-Z)</option>
                            <option value="Z-A">Nombre(Z-A)</option>
                        </select>
                    </div>
                </div>
                <div className='table-responsive'>
                    <table className="table table-sm table-hover table-striped table-bordered border-dark">
                        <thead className='table-dark'>
                            <tr>

                                <th scope="col">Estado</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Usuario</th>
                                <th scope="col">Email</th>
                                <th scope="col">Telefono</th>
                                <th scope="col">Direccion</th>
                                <th scope="col">Provincia</th>
                                <th scope="col">Perfil</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCustomers.map((c, id) => (
                                <tr key={`tr-${id}`}>
                                    <td key={`status-${id}`} className='d-flex justify-content-center'>

                                        {c.rol !== '3'
                                            ? <i className="fs-4 bi-check-circle text-success" ></i>
                                            : <i className="fs-4 bi-x-circle text-danger"></i>
                                        }
                                        {/* <div className="form-check form-switch">
                                            <input className="form-check-input"
                                                type="checkbox"
                                                id="flexSwitchCheckChecked"
                                                onChange={()=>changeStatus(c.rol,c.id)}
                                                checked={isChecked(c.rol)} 
                                                />
                                        </div> */}
                                    </td>

                                    <td key={`nombre-${id}`}>{c.nombre}</td>
                                    <td key={`usuario-${id}`}>{c.usuario}</td>
                                    <td key={`email-${id}`}>{c.email}</td>
                                    <td key={`telefono-${id}`}>{c.telefono}</td>
                                    <td key={`direccion-${id}`}>{c.direccion}</td>
                                    <td key={`provincia-${id}`}>{c.provincia}</td>
                                    <td key={`perfil-${id}`}>
                                        <Link to={`/dashboard/admin/UserDetailAdmin/${c.id}`}>
                                            <button type="button" className="btn btn-outline-primary">
                                                Perfil
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='col'>
                    <Paging
                        productsOnPage={customersOnPage}
                        allProducts={allCustomers.length}
                        paginado={paginado}

                    />
                </div>
            </>
        )
    }

}

export default TableCustomers