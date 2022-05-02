import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../Actions/users';
import Paging from '../Paging/Paging';

const TableCustomers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getAllUsers())
    }, [dispatch]);

    const customers = useSelector(state => state.userReducer.users)
    const [currentPage, setCurrentPage] = useState(1)
    const [customersOnPage, setCustomersOnPage] = useState(10)
    const indexLastCustomer = currentPage * customersOnPage
    const indexFirstCustomer = indexLastCustomer - customersOnPage;

    const allCustomers = customers.filter(c=> c.rol == 1);
    const currentCustomers = allCustomers.slice(indexFirstCustomer, indexLastCustomer)

    const paginado = (pageNum) => {
        setCurrentPage(pageNum)
    }
    
  return (
      <>
    <div className='table-responsive'>
                    <table className="table table-sm table-hover table-striped table-bordered border-primary">
                        <thead className='table-dark'>
                            <tr>
                                
                                <th scope="col"></th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Usuario</th>
                                <th scope="col">Email</th>
                                <th scope="col">Telefono</th>
                                <th scope="col">Direccion</th>
                                <th scope="col">Provincia</th>
                                <th scope="col">Pais</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCustomers.map(c => (
                                <tr >
                                    <td className='text-center'>
                                        <i className="fs-4 bi-trash3-fill"></i>
                                    </td>

                                    <td>{c.nombre}</td>
                                    <td>{c.usuario}</td>
                                    <td>{c.email}</td>
                                    <td>{c.telefono}</td>
                                    <td>{c.direccion}</td>
                                    <td>{c.provincia}</td>
                                    <td>{c.pais}</td>
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