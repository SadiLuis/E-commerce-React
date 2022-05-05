import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { changeStatusUser, getAllUsers } from '../../Actions/users';
import Paging from '../Paging/Paging';

const TableCustomers = () => {
    const dispatch = useDispatch();

    const [status, setStatus] = useState('')

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch]);

    const customers = useSelector(state => state.userReducer.users)
    const [currentPage, setCurrentPage] = useState(1)
    const [customersOnPage, setCustomersOnPage] = useState(10)
    const indexLastCustomer = currentPage * customersOnPage
    const indexFirstCustomer = indexLastCustomer - customersOnPage;

    const allCustomers = customers.filter(c => c.rol !== '2');
    const currentCustomers = allCustomers.slice(indexFirstCustomer, indexLastCustomer)

    const paginado = (pageNum) => {
        setCurrentPage(pageNum)
    }

    const changeStatus = (statusUser, id) => {
        dispatch(changeStatusUser(status, id))
        console.log('status:', statusUser, 'id:', id)
    }

    return (
        <>
            <div className='table-responsive'>
                <table className="table table-sm table-hover table-striped table-bordered border-primary">
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
                        {currentCustomers.map(c => (
                            <tr >
                                <td className='d-flex justify-content-center'>

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

                                <td>{c.nombre}</td>
                                <td>{c.usuario}</td>
                                <td>{c.email}</td>
                                <td>{c.telefono}</td>
                                <td>{c.direccion}</td>
                                <td>{c.provincia}</td>
                                <td>
                                    <Link to={`/dashboard/admin/UserDetailAdmin/${c.id}`}>
                                        <button type="button" class="btn btn-outline-primary">
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

export default TableCustomers